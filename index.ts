import { config } from 'dotenv'
if (process.env.NODE_ENV !== "production") config()
//import { run } from '@grammyjs/runner'
//import { apiThrottler } from '@grammyjs/transformer-throttler'
import { Bot, type Context, session, InlineKeyboard } from 'grammy'
import { type Conversation, type ConversationFlavor, conversations, createConversation, } from "@grammyjs/conversations"
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const ai = new OpenAIApi(configuration)
type MyContext = Context & ConversationFlavor
type MyConversation = Conversation<MyContext>
//@ts-ignore
const bot = new Bot<MyContext>(process.env.BOT_TOKEN)
// const throttler = apiThrottler()
// bot.api.config.use(throttler)
bot.use(session({ initial: () => ({}) }))
bot.use(conversations())
async function chat(convo: MyConversation, ctx: MyContext) {
    try {
        await ai.createCompletion({
            model: "text-davinci-003",
            prompt: ctx.message?.text,
            max_tokens: 7,
            temperature: 0,
        }).then(async (res) => {
            const objects = res.data.choices
            console.log(objects)
            let text = ''
            objects.map((x) => {
                text += `${x.text}`
            })
            await ctx.reply(text)
        }).catch((e) => {
            throw new Error(e)
        })
    } catch (e) {
        await ctx.reply("An error occured")
    }
}
bot.use(createConversation(chat))
bot.on("message", async (ctx) => await ctx.conversation.enter("chat"))
bot.start()
console.log("> Bot Started")