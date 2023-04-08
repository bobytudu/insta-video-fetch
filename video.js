const { IgApiClient } = require("instagram-private-api");
const {
  writeToFile,
  downloadFile,
  getFileList,
  mergeVideos,
} = require("./utils");
const path = require('path')

const ig = new IgApiClient();

(async () => {
  try {
    const username = "bobytudu7";
    const password = "apple4648";
    ig.state.generateDevice(username);
    // You must generate a session to be able to search for media
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login(username, password);
    console.log("*********login success*********")
    // Fetch the latest funny videos by searching for media with the hashtag #funnyvideos
    const media = await ig.feed.tag("funnypet").request();

    const videoUrls = media.items
      .filter((m) => m.video_versions)
      .map((m) => m.video_versions[0].url);
    console.log(`**********${videoUrls.length} videos*******`);

    console.log("******downloading videos*********");
    // videoUrls.forEach((item, index) => {
    //   downloadFile(item, `video_${index}.mp4`);
    // });
    for (let i=0; i>videoUrls.length; i++) {
      await downloadFile(item, `video_${index}.mp4`);
    }

  
    
    // writeToFile("./links.json", videoUrls);
  } catch (error) {
    console.log(error.message);
  }
})();
