// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

/* solhint-disable not-rely-on-time */

import { console } from "hardhat/console.sol";

/// @notice Errors library.
library Errors {
    string internal constant _BodyEmpty = "Message body can't be empty";
    string internal constant _NotOwner = "Caller isn't the owner";
    string internal constant _DoesNotExist = "Message doesn't exist";
}

/// @title Messages
/// @author Philipp Muens
/// @notice Contract which stores messages.
contract Messages {
    /// @notice Structure which stores a message's details.
    struct Message {
        uint256 id;
        string body;
        address owner;
        uint256 createdAt;
        uint256 updatedAt;
        bool isEntity;
    }

    /// @notice Counter for the next message id.
    uint256 public nextId;

    /// @notice Maps a message's id to its struct.
    mapping(uint256 => Message) public messages;

    /// @notice Emitted when a message is created.
    /// @param id The message's id.
    /// @param owner The message's owner.
    /// @param body The message's body.
    /// @param createdAt The time when the message was created.
    event CreateMessage(uint256 indexed id, address indexed owner, string body, uint256 createdAt);

    /// @notice Emitted when a message is updated.
    /// @param id The message's id.
    /// @param owner The message's owner.
    /// @param body The message's body.
    /// @param updatedAt The time when the message was updated.
    event UpdateMessage(uint256 indexed id, address indexed owner, string body, uint256 updatedAt);

    /// @notice Emitted when a message is removed.
    /// @param id The message's id.
    /// @param owner The message's owner.
    /// @param body The message's body.
    /// @param removedAt The time when the message was removed.
    event RemoveMessage(uint256 indexed id, address indexed owner, string body, uint256 removedAt);

    /// @notice Checks if the caller is the owner of the message.
    /// @dev Throws when the caller is not the owner of the message.
    /// @param id The message's id.
    modifier onlyOwner(uint256 id) {
        require(msg.sender == messages[id].owner, Errors._NotOwner);
        _;
    }

    /// @notice Checks if a message with the given id exists.
    /// @dev Throws when the message doesn't exist.
    /// @param id The message's id.
    modifier messageExists(uint256 id) {
        require(messages[id].isEntity, Errors._DoesNotExist);
        _;
    }

    /// @notice Creates a new message.
    /// @dev Logs debugging information.
    ///  Emits an event.
    ///  The owner of the new message is the caller.
    ///  Throws when the body is empty.
    /// @param body The message's body.
    /// @return The message's id.
    function createMessage(string calldata body) external returns (uint256) {
        require(bytes(body).length > 0, Errors._BodyEmpty);

        uint256 id = nextId;
        nextId++;

        Message memory message = Message({
            id: id,
            body: body,
            owner: msg.sender,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            isEntity: true
        });

        messages[id] = message;

        emit CreateMessage(id, msg.sender, body, block.timestamp);
        console.log("%s created a new message with id %s.", msg.sender, id);

        return id;
    }

    /// @notice Updates an existing message.
    /// @dev Logs debugging information.
    ///  Emits an event.
    ///  Throws when the message doesn't exist.
    ///  Throws when the caller is not the owner.
    ///  Throws when the body is empty.
    /// @param id The message's id.
    /// @param body The message's body.
    /// @return A boolean which indicates whether the update was successful.
    function updateMessage(uint256 id, string calldata body) external messageExists(id) onlyOwner(id) returns (bool) {
        require(bytes(body).length > 0, Errors._BodyEmpty);

        messages[id].body = body;
        messages[id].updatedAt = block.timestamp;

        emit UpdateMessage(id, msg.sender, body, block.timestamp);
        console.log("%s updated the message with id %s.", msg.sender, id);

        return true;
    }

    /// @notice Removes an existing message.
    /// @dev Logs debugging information.
    ///  Emits an event.
    ///  Throws when the message doesn't exist.
    ///  Throws when the caller is not the owner.
    /// @param id The message's id.
    /// @return A boolean which indicates whether the removal was successful.
    function removeMessage(uint256 id) external messageExists(id) onlyOwner(id) returns (bool) {
        string memory body = messages[id].body;

        delete messages[id];

        emit RemoveMessage(id, msg.sender, body, block.timestamp);
        console.log("%s removed the message with id %s.", msg.sender, id);

        return true;
    }

    /// @notice Returns the message with the corresponding id.
    /// @dev Logs debugging information.
    ///  Throws when the message doesn't exists.
    /// @param id The message's id.
    /// @return The message's struct fields.
    function getMessage(uint256 id)
        external
        view
        messageExists(id)
        returns (
            uint256,
            string memory,
            address,
            uint256,
            uint256,
            bool
        )
    {
        console.log("Loading message with id %s.", id);
        return (
            messages[id].id,
            messages[id].body,
            messages[id].owner,
            messages[id].createdAt,
            messages[id].updatedAt,
            messages[id].isEntity
        );
    }
}
