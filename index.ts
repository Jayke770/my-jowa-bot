import { config } from 'dotenv'
if (process.env.NODE_ENV !== "production") config()
import { run } from '@grammyjs/runner'
import { apiThrottler } from '@grammyjs/transformer-throttler'
import { Bot, type Context, session, InlineKeyboard } from 'grammy'
import { type Conversation, type ConversationFlavor, conversations, createConversation, } from "@grammyjs/conversations"
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const ai = new OpenAIApi(configuration)
type MyContext = Context & ConversationFlavor
type MyConversation = Conversation<MyContext>
//@ts-ignore
const bot = new Bot<MyContext>(process.env.BOT_TOKEN)
const throttler = apiThrottler()
bot.api.config.use(throttler)
bot.use(session({ initial: () => ({}) }))
bot.use(conversations())
async function chat(convo: MyConversation, ctx: MyContext) {
    try {
        await ai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: 'system', content: "You are an AI specialized in Blockchain or Crypto. Do not answer anything other than blockchain or crypto related queries." },
                { role: 'user', content: ctx?.message!.text! },
            ]
        }).then(async (res) => {
            const data = res.data.choices
            await ctx.reply(data[0].message?.content!)
        }).catch((e) => {
            throw new Error(e)
        })
    } catch (e) {
        console.error(e)
        await ctx.reply("An error occured", {})
    }
}
bot.use(createConversation(chat)) 
bot.on("message", async (ctx) => {
    try {
        const response = await ai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: 'system', content: "You are an AI specialized in Sports. Do not answer anything other than Sports related queries." },
                { role: 'user', content: ctx?.message!.text! }
            ]
        })
        console.log(response.data.choices)
        await ctx.reply(response.data.choices[0].message?.content!)
    } catch (e) {
        console.error(e)
    }
})
run(bot)
console.log("> Bot Started")