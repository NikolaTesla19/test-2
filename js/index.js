

const chevronEvent = () => {

  let button = document.querySelector('#chevron-down');
  let icon = document.querySelector('#chevron-down i');
  let storeMenu = document.querySelector('.store-menu');
  let firstTime = true;
  button.addEventListener('click', (e) => {
    if (firstTime) {
      icon.classList.toggle('menu-chevron-up-animation');
      storeMenu.classList.toggle('store-menu-open');
      firstTime = false;
    } else {
      icon.classList.toggle('menu-chevron-up-animation');
      icon.classList.toggle('menu-chevron-down-animation');
      storeMenu.classList.toggle('store-menu-open');
      storeMenu.classList.toggle('store-menu-close');

    }
  })
}
const burgerMenu = () => {
  let burgerMenu = document.querySelector('.menu-burger');
  let menu = document.querySelector('.menu');
  burgerMenu.addEventListener('click', () => {
    menu.classList.toggle('open-burger-menu')
  })
}
const slider = (next, prew, len) => {
  let points = document.querySelector('.point-container');
  points.children[0].classList.add('active-point');
  let container = document.querySelector('.comment-slider');
  let left = Number(container.style.marginLeft);
  let numberOfCom = 1;
  prew.addEventListener('click', () => {
    if (numberOfCom > 1) {
      next.classList.remove('opacity0');
      next.classList.add('pointer');
      points.children[numberOfCom - 1].classList.remove('active-point');
      points.children[numberOfCom - 2].classList.add('active-point');
      let ind = 0;
      --numberOfCom;
      let scroll = setInterval(() => {
        left = left + 8;
        container.style.marginLeft = left + 'px';
        ++ind;
        if (ind === (container.children[0].clientWidth / 8)) {
          clearInterval(scroll);
        }
      }, 1);

    }
    if (numberOfCom === 1) {
      prew.classList.add('opacity0');
      prew.classList.remove('pointer');
    }
  });
  next.addEventListener('click', () => {
    if (numberOfCom < len) {
      prew.classList.remove('opacity0');
      prew.classList.add('pointer');
      points.children[numberOfCom - 1].classList.remove('active-point');
      points.children[numberOfCom].classList.add('active-point');
      let ind = 0;
      ++numberOfCom;

      let scroll = setInterval(() => {
        left = left - 8;
        container.style.marginLeft = left + 'px';
        ++ind;
        if (ind === (container.children[0].clientWidth / 8)) {
          clearInterval(scroll);
        }
      }, 1);
    }
    if (numberOfCom === len) {
      next.classList.add('opacity0');
      next.classList.remove('pointer');
    }
  });

}

const getCommentsFetch = async() => {
  try {
    let response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline', {
      method: 'GET'
    });
    let result = await response.json();
    return result
  } catch (e) {
    console.log('error');
  }
}

const getCommentsFilter = async() => {
  let array = await getCommentsFetch();
  let resultArray = array.filter(obj => Number(obj.price) < 5)
  return resultArray;
}
const createComment = (obj) => {
  let div = document.createElement('div');
  div.classList.add('comment');
  let brackets = document.createElement('p');
  brackets.innerText = '“';
  let comment = document.createElement('p');
  comment.innerText = obj.name;
  let price = document.createElement('p');
  price.innerText = obj.price;
  div.appendChild(brackets);
  div.appendChild(comment);
  div.appendChild(price);
  return div;
}
const createPoint = () => {
  let div = document.createElement('div');
  div.classList.add('comment-point');
  return div
}
const getComments = async() => {
  let arrowRight = document.querySelector('#arrowRight');
  let arrowLeft = document.querySelector('#arrowLeft');
  let array = await getCommentsFilter();
  let pointContainer = document.querySelector('.point-container');
  let container = document.querySelector('.comment-slider');
  for (let i = 0; i < array.length; i++) {
    container.appendChild(createComment(array[i]));
    pointContainer.appendChild(createPoint());
  }
  if (array.length < 2) {
    arrowRight.classList.add('opacity0');
    arrowRight.classList.remove('pointer');
  }
  slider(arrowRight, arrowLeft, array.length);
}

const video = () => {
  let videoContainer = document.querySelector('.video-container');
  let videoPlayerShadow = document.querySelector('.video-player-shadow');
  let videoPlayer = document.querySelector('.video-player');
  videoContainer.addEventListener('click', () => {
    videoPlayerShadow.style.display = 'block';
    videoPlayer.style.display = 'block';
  });
  videoPlayerShadow.addEventListener('click', () => {
    videoPlayerShadow.style.display = 'none';
    videoPlayer.style.display = 'none';
  });

  let video = document.querySelector('#video');
  let videoTrack = document.querySelector('.video-track');
  let time = document.querySelector('.timeline');
  let btnPlay = document.querySelector('.play');
  let btnPause = document.querySelector('.pause');
  let btnRewind = document.querySelector('.rewind');
  let btnForward = document.querySelector('.forward');

  btnPlay.addEventListener('click', function() {
    video.play();
    videoPlay = setInterval(function() {
      let videoTime = Math.round(video.currentTime)
      let videoLength = Math.round(video.duration)
      time.style.width = (videoTime * 100) / videoLength + '%';
    }, 10)
  });

  btnPause.addEventListener('click', function() {
    video.pause();
    clearInterval(videoPlay);
  });

  btnRewind.addEventListener('click', function() {
      video.currentTime -= 5;
  });

  btnForward.addEventListener('click', function() {
      video.currentTime += 5;
  });

  videoTrack.addEventListener('click', function(e) {
    let clientWindowWhidth = document.documentElement.clientWidth;
    let posX = e.clientX;
    let timePos = ((posX - clientWindowWhidth * 0.5 + videoTrack.clientWidth / 2) * 100) / videoTrack.clientWidth;
    time.style.width = timePos + '%';
    video.currentTime = (timePos * Math.round(video.duration)) / 100
  });
}








window.onload = () => {
  chevronEvent();
  getComments();
  video();
  burgerMenu();
}
