module.exports = {
    apps: [{
        name: "my-jowa-bot",
        script: "./dist",
        env_production: {
            NODE_ENV: "production",
            BOT_TOKEN: "6182381541:AAGK_SWovrMFdodR8ywGY9-ElUGVnC-MCOU",
            OPENAI_API_KEY: "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"
        }
    }]
}