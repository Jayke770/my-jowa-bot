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