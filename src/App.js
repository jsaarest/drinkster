import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Fab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './App.css';

import logo from './drinkster-logotype.svg';



import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';




const useStyles = makeStyles({

  logo: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '30px',
    marginBottom: '10px',
    width: '50%'
  },
  container: {
    margin: '10px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    paddingTop: '20px',
  },
  textArea: {
    height: 150
  },
  card: {
    width: 400,
    borderRadius: 20,
    border: 'solid 0.5px #c7c7c7',
    boxShadow: "4px 14px 90px -4px rgba(92,96,102,0.16)"
    //height: 600,
  },
  media: {
    height: 400,
  },
  buttonBase: {
    border: 'solid 5px lightgrey',
    boxShadow:'unset',
    backgroundColor: 'white',
    marginRight: '-5px'
  },

});


const App = () => {

  const classes = useStyles();


  const [data, setData] = useState({drinks:[]});

  useEffect(() => {

    const fetchData = async () => {
      const result = await axios(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php/',
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php/')

    setData(result.data)
  };

  //console.log('drinks', data.drinks[0]);
//console.log("data", parsedData);

  return(


    <div className={classes.container}>
      <img className={classes.logo} src={logo} alt="Logo" height='25px'/>
      <div className={classes.row}>
          <Card className={classes.card} elevation={2}>
            <CardActionArea className={classes.card}>

              {data.drinks.map(drink => (
                <CardMedia
                  key={drink.strDrinkThumb}
                  className={classes.media}
                  image={drink.strDrinkThumb}
                />
              ))}

            <CardContent className={classes.textArea}>
              {/* This returns the category of the drink. For example: "Punch", "Party" */}
              {data.drinks.map(drink => (
                <Typography color='textSecondary' variant="overline" display="block" key={drink.strCategory}>
                  {drink.strCategory}
                </Typography>
              ))}

              {/* This returns the name of the drink. For example: Gin tonic */}
              {data.drinks.map(drink => (
                <Typography gutterBottom variant="h5" component="h2" key={drink.idDrink}>
                  {drink.strDrink}
                </Typography>
              ))}

              {/* This returns the instructions for the drink */}
              {data.drinks.map(drink => (
                <Typography variant="body2" color="textSecondary" component="p" key={drink.strInstructions}>
                  {drink.strInstructions}
                </Typography>
              ))}
            </CardContent>
        </CardActionArea>
      </Card>
      </div>

      {/* Buttons for swiping actions */}
      <div className={classes.row}>

        <Fab className={classes.buttonBase} size='large'>
          <FavoriteIcon
            style={{fill: '#3de073'}}/>
        </Fab>

        <Fab className={classes.buttonBase} size='large' onClick={fetchData}>
          <ClearIcon
            color='secondary'/>
        </Fab>

      </div>

    </div>



  )
;


}

export default App;




