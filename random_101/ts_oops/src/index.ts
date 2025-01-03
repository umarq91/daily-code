class Song {
  name;
  artist;
  duration;
  current = 0;
  playList: Playlist | null = null;

  constructor(name: string, artist: string, duration: number) {
    this.name = name;
    this.artist = artist;
    this.duration = duration;
  }

  setPlaylist(playlist: Playlist) {
    this.playList = playlist;
  }

  play() {
    const timeout = setInterval(() => {
      this.current += 1;
      console.log("playing");
      if (this.current >= this.duration) {
        this.pause();
        clearInterval(timeout);
        if (this.playList) {
          this.playList.next();
        }
      }
    }, 1000);
  }
  pause() {
    console.log(`Paused`);
  }
}

class Playlist {
  songs: Song[] = [];
  public currentSongIndex: number = 0;
  isRandomEnabled = false;

  constructor(songs: Song[]) {
    this.songs = songs;
    songs.forEach((song) => song.setPlaylist(this));
  }
  playSong() {
    this.songs[this.currentSongIndex].play();
    console.log(this.songs[this.currentSongIndex].name);
  }

  addSong(song: Song) {
    this.songs.push(song);
  }

  next() {
    if (this.currentSongIndex >= this.songs.length) {
      console.log("Last Song");
    }

    if (this.isRandomEnabled) {
      const random = Math.floor(Math.random() * this.songs.length);
      this.currentSongIndex = random;
    } else {
      this.currentSongIndex += 1;
    }
    this.playSong();
  }

  shuffle() {
    const random = Math.floor(Math.random() * this.songs.length - 1);
    this.currentSongIndex = random;
    this.isRandomEnabled = true;
    this.playSong();
  }
}

const sajni = new Song("1", "Umar", 2);
const sajni2 = new Song("2", "Umar", 3);
const sajni4 = new Song("3", "Umar", 5);
const sajni5 = new Song("4", "Umar", 1);
const sajni7 = new Song("5", "Umar", 7);

const mixSongs = new Playlist([sajni7, sajni2, sajni5, sajni2, sajni]);
mixSongs.shuffle();
