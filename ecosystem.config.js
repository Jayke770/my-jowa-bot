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