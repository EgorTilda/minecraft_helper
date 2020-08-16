$(document).ready(() => {

  class PlaylistCollection {
    constructor(channelId = 'UCPX53dr-NSKoXspKmXanbCw') {
      this.channelId = channelId;
      this.URL = 'https://www.googleapis.com/youtube/v3/playlists';
      this.optionsPlaylists = {
        part: 'snippet, contentDetails', 
        key: 'AIzaSyCR6VpUIhS3dU53D5bcck38zh6KcnFQMxI',
        channelId: channelId
      };
    }
    load() {
      $.getJSON(this.URL, this.optionsPlaylists, (data) => {
        let count = 0;
        for(let i = 0; i < data.items.length; i++) {
            count += data.items[i].contentDetails.itemCount;
            loadVideo(data.items[i].id);
        }
        loadVideo(data.items[0].id, count);
      });
    }
  }
  function loadVideo(id, countVideo) {
    const options = {
      part: 'snippet, contentDetails', 
      key: 'AIzaSyCR6VpUIhS3dU53D5bcck38zh6KcnFQMxI',
      playlistId: id
    };
    $.getJSON('https://www.googleapis.com/youtube/v3/playlistItems', options, (data) => {
      for(let j = 0; j <= countVideo; j++) {
        renderVideo(data.items[j].snippet.title, data.contentDetails.videoPublishedAt, data.items[j].snippet.description);
      }
      document.querySelectorAll('.video-link').forEach((item, i) => {
        item.setAttribute('href', `https://www.youtube.com/watch?v=${data.items[i].snippet.resourceId.videoId}`);
      });
    });
  }
  function renderVideo(title, desc, date, srcPreview = '../assets/preview.jpg') {
    const div = document.createElement('div');
    div.classList.add('.video');
    document.querySelector('.video__preview').style.backgroundImage = `url(${srcPreview})`;
    div.innerHTML = `
          <div class="video__preview">
            <a href="" class="video-link">
              <img src="assets/video.svg" alt="play" class="video__play">
            </a>
        </div>
        <div class="video__info">
          <div class="video__info-title">${title}</div>
          <div class="video__info-desc">${desc}</div>
          <div class="video__info-date">${date}</div>
        </div>
    `;
    document.querySelector('.videos__list').appendChild(div);
  }
  
  const channel = new PlaylistCollection();
  channel.load();

});