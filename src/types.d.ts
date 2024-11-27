interface IVideo {
  label: string;
  id: string;
}

interface IVideoAPI {
  show: {
    name: string;
    id: string;
  }
}

interface IFullFirm {
  name: string;
  language: string;
  image: {
    medium: string;
  };
  genres: string[];
  premiered: string;
}