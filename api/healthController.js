const { ApiResponse } = require('../models/apiResponse');

exports.checkHealth = async (req, res) => {
    try {
        const environment = process.env.NODE_ENV || 'development';
        
        const healthStatus = {
            status: "healthy",
            timestamp: new Date().toISOString(),
            services: {
                application: {
                    status: "up",
                    environment: environment,
                    uptime: process.uptime() + " seconds"
                }
            }
        };

        res.status(200).json(healthStatus);
    } catch (error) {
        const unhealthyStatus = {
            status: "unhealthy",
            timestamp: new Date().toISOString(),
            services: {
                application: {
                    status: "down",
                    environment: process.env.NODE_ENV || 'development',
                    error: error.message
                }
            }
        };

        res.status(503).json(unhealthyStatus);
    }
}; 