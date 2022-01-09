/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: [
      // Default Next.js setup
      //  (see: https://nextjs.org/docs/basic-features/eslint#linting-custom-directories-and-files)
      'components',
      'pages',
      'lib',
      // Custom directories
      'hooks',
      'scripts',
      'utils'
    ]
  }
}
