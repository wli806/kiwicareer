/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE_URL: 'http://localhost:9001',
        FRONT_END_URL: 'http://localhost:3000'

        // API_BASE_URL: 'https://api.kiwicareer.co.nz',
        // FRONT_END_URL: 'https://kiwicareer.co.nz'
    }
}

module.exports = nextConfig
