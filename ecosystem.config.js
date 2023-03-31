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