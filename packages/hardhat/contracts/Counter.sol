// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "hardhat/console.sol";

error CounterError(string);

/// @title Counter
/// @author Philipp Muens
/// @notice A Counter example contract.
contract Counter {
    /// @notice The counter value state variable.
    int256 private _counter;

    /// @notice Emitted when the counter is incremented.
    /// @param oldValue The old counter value.
    /// @param newValue The new counter value.
    event Increment(int256 indexed oldValue, int256 indexed newValue);

    /// @notice Emitted when the counter is decremented.
    /// @param oldValue The old counter value.
    /// @param newValue The new counter value.
    event Decrement(int256 indexed oldValue, int256 indexed newValue);

    /// @notice Creates a new Counter that accepts an initial value.
    /// @param counter The initial value the counter should be set to.
    constructor(int256 counter) {
        _counter = counter;
    }

    /// @notice Increments the counter by one.
    /// @dev Logs a message to the console and emits an event.
    function increment() external {
        console.log("Counter incremented...");
        int256 oldValue = _counter;
        _counter++;
        int256 newValue = _counter;
        emit Increment(oldValue, newValue);
    }

    /// @notice Decrements the counter by one.
    /// @dev Logs a message to the console and emits an event.
    function decrement() external {
        console.log("Counter decremented...");
        int256 oldValue = _counter;
        _counter--;
        int256 newValue = _counter;
        emit Decrement(oldValue, newValue);
    }

    /// @notice Sets the counter to a new value.
    /// @param counter A number the counter should be set to.
    function set(int256 counter) external {
        _counter = counter;
    }

    /// @notice Returns the current counter value.
    /// @return The current counter value.
    function get() external view returns (int256) {
        return _counter;
    }

    /// @notice Reverts with a Custom Error.
    /// @dev Only included to demonstrate how Custom Errors can be used.
    function throwError() external pure {
        revert CounterError("Something went wrong...");
    }
}
