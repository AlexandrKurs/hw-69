import {Autocomplete, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import { getOneVideoById, getSimilarVideos } from '../store/thunks/videosThunks.ts';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import {
  clearOneVideo,
  selectAllSimilarVideos,
  selectIsFetchingOneVideo,
  selectOneVideo
} from '../store/slices/videosSlice.ts';
import Spinner from '../components/UI/Spinner.tsx';


const Videos = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const options = useAppSelector(selectAllSimilarVideos);
  const oneVideo = useAppSelector(selectOneVideo);
  const isLoading = useAppSelector(selectIsFetchingOneVideo);

  useEffect(() => {
    if (id) {
      dispatch(getOneVideoById(id));
    }
  }, [id, dispatch])

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = e.target;

    if (value !== '') {
      dispatch(getSimilarVideos(value));
    }
  };

  const getCurrentValue = (value: IVideo | null) => {
    console.log(value);
    if (value) {
      navigate('/shows/' + value.id);
    }
  };


  return (
    <div className="container w-75">
      <
        Autocomplete
        disablePortal
        options={options}
        sx={{width: 300}}
        getOptionLabel={(option) => option.label}
        getOptionKey={(option) => option.id || option.label}
        onChange={(_e, value) => getCurrentValue(value)}
        onInputChange={(_e, value) => {
          if (value === '') {
            navigate('/');
            dispatch(clearOneVideo());
          }
        }}
        renderInput={(params) =>
          <TextField
            {...params}
            label="Movie"
            onChange={e => changeInputValue(e)}
          />
        }
      />

      <hr/>

      <div>
        {isLoading ? <Spinner/> :
          <>

            {oneVideo ?
              <div className="border border-black p-2 d-flex justify-content-between mx-auto bg-secondary text-white py-4 ps-4">
                <div>
                  <img width="100" src={oneVideo.image.medium} alt={oneVideo.name}/>
                </div>
                <div className="w-50">
                  <h4>{oneVideo.name}</h4>
                  <p><b>Premiered: </b><small>{oneVideo.premiered}</small></p>
                  <p><b>Genres: </b><small>{oneVideo.genres}</small></p>
                </div>
              </div> : null}
          </>
        }

      </div>
    </div>
  );
};

export default Videos;