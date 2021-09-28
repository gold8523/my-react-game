import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import PokemonCards from "../../../../components/PokemonCards"

// import { FireBaseContext } from "../../../../context/firebaseContext";
import { PokemonContext } from "../../../../context/pokemonContext";
import { getPokemonsAsync, selectPokemonsData } from "../../../../store/pokemons";
import { selectedPokemonsData, addPokemon } from "../../../../store/selectedPokemons";
import s from "./style.module.css";

const StartPage = () => {
  // const firebase = useContext(FireBaseContext);
  const pokemonContext = useContext(PokemonContext);
  // const isLoading = useSelector(selectPokemonsLoading);
  const pokemonsRedux = useSelector(selectPokemonsData);
  const selectedPokemonsRedux = useSelector(selectedPokemonsData);
  const dispatch = useDispatch();
  const history = useHistory();

  const [pokemons, setPokemons] = useState({})

  useEffect(() => {
    dispatch(getPokemonsAsync());
    // dispatch(cleanPokemons());
  }, [dispatch])

  useEffect(() => {
    setPokemons(pokemonsRedux);
  }, [pokemonsRedux]);

  const onClickCard = (key) => {
    const pokemon = { ...pokemons[key] }

      setPokemons(prevState => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          selected: !prevState[key].selected
        }
      }))

      dispatch(addPokemon({
        ...selectedPokemonsRedux,
        [key]: pokemon
      }));

    // pokemonContext.onSelected(key, pokemon);
    // setPokemons(prevState => ({
    //   ...prevState,
    //   [key]: {
    //     ...prevState[key],
    //     selected: !prevState[key].selected
    //   }
    // }))
  }

  const handleStartGame = () => {
    history.push('/game/board');
  }

  return (
    <>
      <div className={s.buttonWrap}>
        <button
          onClick={handleStartGame}
          disabled={Object.keys(selectedPokemonsRedux).length < 5}
        >
            Start Game
        </button>
      </div>
      <div className={s.flex}>
        {
          Object.entries(pokemons).map(([key, { name, img, id, type, values, selected }]) =>
            <PokemonCards
              className={s.card}
              key={key}
              name={name}
              img={img}
              id={id}
              type={type}
              values ={values}
              isActive={true}
              isSelected={selected}
              onClickCard={() => {
                if (Object.keys(selectedPokemonsRedux).length < 5 || selected) {
                  onClickCard(key)
                }
              }}
          />)
        }
      </div>
    </>
  );
};

export default StartPage;
