import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {useSpring, animated} from 'react-spring'


//material ui components
import Chip from '@material-ui/core/Chip';
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
import Tooltip from '@material-ui/core/Tooltip';

import logo from './drinkster-logotype.svg';

//material ui icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import RefreshIcon from '@material-ui/icons/Refresh';




const useStyles = makeStyles({

  logo: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
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
    height: 180,
    paddingBottom: 20,
    overflowY: 'scroll'
  },
  card: {
    maxWidth: 550,
    width: '100%',
    height: 520,
    borderRadius: 20,
    //border: 'solid 0.5px #c7c7c7',
    boxShadow: "4px 14px 50px -4px rgba(92,96,102,0.16)"
    //height: 600,
  },
  media: {
    height: 300,
  },
  buttonBase: {
    touchAction: 'none',
    border: 'solid 5px lightgrey',
    boxShadow:'unset',
    backgroundColor: 'white',
    marginRight: '-5px'
  },
  tagLine: {
    display: 'flex',
    //padding: '0px 2px',
    marginBottom: '10px',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },

});


const App = () => {

  const classes = useStyles();

  const props = useSpring({opacity: 1, from: {opacity: 0}})

  const [data, setData] = useState({drinks:[]});

  const [fullData, setFullData] = useState(false);

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
    const result = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php/');
    setFullData(false);
    setData(result.data)
  };

  //console.log('drinks', data.drinks[0]);
//console.log("data", parsedData);

  return(

    <animated.div className={classes.container} style={props}>
      <img className={classes.logo} src={logo} alt="Logo" height='20px'/>
      <div className={classes.row}>

        {data.drinks.map(drink => (
          <Card className={classes.card} elevation={2} key={drink.idDrink}>

            <CardMedia
              key={drink.strDrinkThumb}
              className={classes.media}
              image={drink.strDrinkThumb}
            />

            <CardContent className={classes.textArea}>
              {/* This returns the category of the drink. For example: "Punch", "Party" */}

                <div className={classes.tagLine}>
                  {/*<Typography color='textSecondary' variant="overline" display="block" key={drink.strCategory}>
                    {drink.strCategory}
                  </Typography>*/}

                  {!fullData &&
                  <div>
                    {drink.strIngredient1 && <Tooltip title={drink.strMeasure1}><Chip style={{margin: '1.5px'}} size="small" label={drink.strIngredient1}/></Tooltip>}
                    {drink.strIngredient2 && <Tooltip title={drink.strMeasure2}><Chip style={{margin: '1.5px'}} size="small" label={drink.strIngredient2}/></Tooltip>}
                    {drink.strIngredient3 && <Tooltip title={drink.strMeasure3}><Chip style={{margin: '1.5px'}} size="small" label={drink.strIngredient3}/></Tooltip>}
                    {drink.strIngredient4 && <Tooltip title={drink.strMeasure4}><Chip style={{margin: '1.5px'}} size="small" label={drink.strIngredient4}/></Tooltip>}
                    {/*drink.strIngredient5 && <Chip style={{marginRight: '3px'}} size="small" label={drink.strIngredient5}/>*/}
                  </div>}

                </div>

              {/* This returns the name of the drink. For example: Gin tonic */}
                <Typography gutterBottom variant="h5" component="h2">
                  {drink.strDrink}
                </Typography>

              {/* This returns the instructions for the drink */}
                <Typography style={{overflow:'hidden',maxHeight:'80px'}} variant="body2" color="textSecondary" component="p" key={drink.strInstructions}>
                  {drink.strInstructions}
                </Typography>

              {fullData && //Show full list of data when fullData is true
                <div style={{margin: '10px 0px',paddingTop: '10px', borderTop:'solid 0.5px lightgrey', display:'flex', justifyContent:'space-between'}}>
                  <div style={{marginRight: '15px'}}>
                    {drink.strIngredient1 &&
                    <Typography variant="body2" key={drink.strIngredient1}>
                      {drink.strIngredient1}
                    </Typography>}
                    <Typography variant="body2" color="textSecondary" key={drink.strMeasure1}>
                      {drink.strMeasure1}
                    </Typography>
                  </div>
                  <div style={{marginRight: '15px'}}>
                    {drink.strIngredient2 &&
                    <Typography variant="body2" key={drink.strIngredient2}>
                      {drink.strIngredient2}
                    </Typography>}
                    <Typography variant="body2" color="textSecondary" key={drink.strMeasure2}>
                      {drink.strMeasure2}
                    </Typography>
                  </div>
                  <div style={{marginRight: '15px'}}>
                    {drink.strIngredient3 &&
                    <Typography variant="body2" key={drink.strIngredient3}>
                      {drink.strIngredient3}
                    </Typography>}
                    <Typography variant="body2" color="textSecondary" key={drink.strMeasure3}>
                      {drink.strMeasure3}
                    </Typography>
                  </div>
                  <div style={{marginRight: '15px'}}>
                    {drink.strIngredient4 &&
                    <Typography variant="body2" key={drink.strIngredient4}>
                      {drink.strIngredient4}
                    </Typography>}
                    <Typography variant="body2" color="textSecondary" key={drink.strMeasure4}>
                      {drink.strMeasure4}
                    </Typography>
                  </div>
                </div>
              }
            </CardContent>
      </Card>
        ))}
      </div>

      {/* Buttons for swiping actions */}
      <div className={classes.row}>

        <Fab className={classes.buttonBase} size='large' onClick={() => setFullData(true)}>
          <FavoriteIcon
            style={{fill: '#3de073'}}/>
        </Fab>

        <Fab className={classes.buttonBase} size='large' onClick={fetchData} >
          <ClearIcon
            color='secondary'/>
        </Fab>
        {/*<Fab className={classes.buttonBase} size='large' onClick={fetchData}>
          <RefreshIcon
            style={{fill: '#1994ff'}}/>
        </Fab>*/}

      </div>

    </animated.div>



  )
;


}

export default App;





