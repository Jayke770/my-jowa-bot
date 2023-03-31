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