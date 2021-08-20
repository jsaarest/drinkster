import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {animated, useSpring} from 'react-spring'


//material ui components
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import {Fab} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Tooltip from '@material-ui/core/Tooltip';

import logo from './drinkster-logotype.svg';

//material ui icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import TinderCard from "react-tinder-card";


const useStyles = makeStyles({
  swipe: {
    //position: 'absolute'
  },
  logo: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%'
  },
  container: {
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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

  const [data, setData] = useState([]);

  const [fullData, setFullData] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      return await axios(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php/',
      )
    };
    fetchData().then(res => setData(res.data.drinks));
  }, []);

  const fetchData = async () => {
    return await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php/')
  };
  const ref = React.createRef()

  const swipe = (direction) => {
    if(direction === "left") {
      ref.current.swipe(direction)
      return fetchData().then(res => {
        setData(res.data.drinks)
        setFullData(false)
      })
    };
    if(direction === "right") {
      return setFullData(true)
    }
  }

  const onSwipe = (direction) => {
    if(direction === "left") {
      return fetchData().then(res => {
        setFullData(false)
        setData(res.data.drinks)
      })
    };
    if(direction === "right") {
      console.log(data)
      return setFullData(true)
    }
  }
  console.log("This is data:",data)

  const drink = data[0];


  return(

    <div className={classes.container}>
      <img className={classes.logo} src={logo} alt="Logo" height='20px'/>
      <div className={classes.row}>

        {data.length > 0 ? <TinderCard style={props} ref={ref} className={classes.swipe} key={drink.idDrink} onSwipe={(dir) => onSwipe(dir)}>
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
          </TinderCard>
         : 'Loading...'}
      </div>

      {/* Buttons for swiping actions */}
      <div className={classes.row}>

        <Fab className={classes.buttonBase} size='large' onClick={() => swipe('right')}>
          <FavoriteIcon
            style={{fill: '#3de073'}}/>
        </Fab>

        <Fab className={classes.buttonBase} size='large' onClick={() => swipe('left')} >
          <ClearIcon
            color='secondary'/>
        </Fab>
        {/*<Fab className={classes.buttonBase} size='large' onClick={fetchData}>
          <RefreshIcon
            style={{fill: '#1994ff'}}/>
        </Fab>*/}

      </div>

    </div>




  )
;


}

export default App;





