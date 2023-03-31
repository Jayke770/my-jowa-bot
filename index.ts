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
        const response = await ai.createChatCompletion({
            model: "gpt-3.5-turbo-0301",
            messages: [
                { role: 'system', content: "Only answer sports-related queries." },
                { role: 'user', content: ctx?.message!.text! }
            ]
        })
        await ctx.reply(response.data.choices[0].message?.content!)
        return
    } catch (e) {
        console.error(e)
        return
    }
}
bot.use(createConversation(chat))
bot.on("message", async (ctx) => await ctx.conversation.enter("chat"))
run(bot)
console.log("> Bot Started")