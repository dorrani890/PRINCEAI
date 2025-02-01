import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw '✳️ TikTok ka link yahan paste karein:\n *tiktok <link>*';

    m.react('⏳'); // Show processing reaction

    try {
        let res = await fetch(`https://delirius-apiofc.vercel.app/download/tiktok?url=${encodeURIComponent(args[0])}`);
        if (!res.ok) throw '❎ Error: Unable to download video. Please check the link or try again later.';

        let json = await res.json();
        if (!json || !json.data) throw '❎ Video not found.';

        let videoUrl = json.data.video.hd || json.data.video.nowm || json.data.video.wm;
        if (!videoUrl) throw '❎ Failed to process video.';

        await conn.sendFile(m.chat, videoUrl, 'tiktok.mp4', '', m); // Send video

        m.react('✅'); // Success reaction
    } catch (error) {
        console.error(error);
        m.reply('❎ Error: Unable to process the video.');
        m.react('❌');
    }
};

handler.command = ['tiktok', 'tt', 'ttdl', 'tk'];
export default handler;
