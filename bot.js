const { Telegraf, Markup } = require('telegraf');
const express = require('express');

// Environment variables or defaults
const BOT_TOKEN = process.env.BOT_TOKEN || "ඔබගේ_BOT_TOKEN_එක";
const MONETAG_DIRECT_LINK = process.env.MONETAG_DIRECT_LINK || "https://otieufta.com/4/8521493";

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  const name = ctx.from.first_name || 'User';
  return ctx.replyWithHTML(
    `🔥 <b>Welcome ${name}!</b>\n\n⚡ <b>Verified VIP File & Streaming Hub</b>\n\nTap below to unlock direct download:`,
    Markup.inlineKeyboard([
      [Markup.button.url('🚀 UNLOCK CONTENT / DOWNLOAD', MONETAG_DIRECT_LINK)],
      [
        Markup.button.callback('🎁 Daily VIP Bonus', 'daily'),
        Markup.button.callback('👥 Refer & Earn', 'referral')
      ],
      [Markup.button.url('📢 Official Channel', 'https://t.me')]
    ])
  );
});

bot.action('daily', async (ctx) => {
  await ctx.answerCbQuery('Preparing pass...');
  return ctx.replyWithHTML(
    '🎉 <b>Daily VIP Pass!</b>\n\nTap below to verify and claim:',
    Markup.inlineKeyboard([
      [Markup.button.url('⚡ Verify & Claim Reward', MONETAG_DIRECT_LINK)]
    ])
  );
});

bot.action('referral', async (ctx) => {
  await ctx.answerCbQuery();
  const uid = ctx.from.id;
  return ctx.replyWithHTML(
    `👥 <b>Your Invite Link:</b>\n<code>https://t.me/your_bot?start=ref_${uid}</code>\n\nInvite 3 friends or bypass directly:`,
    Markup.inlineKeyboard([
      [Markup.button.url('🚀 Bypass via Sponsor', MONETAG_DIRECT_LINK)]
    ])
  );
});

// Launch Telegram Bot
bot.launch().then(() => console.log('🤖 Monetag Bot is Live 24/7!'));

// Health Check Server (Render.com නොනැවතී Run වීමට මෙය අත්‍යවශ්‍යයි)
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('✅ Monetag Bot is running 24/7 on Render!'));
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 Server running on port ${PORT}`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
