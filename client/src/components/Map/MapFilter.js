import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: 20,
    width: '88%',
  },
  cardStyles: {
    position: 'absolute',
    marginTop: '15px',
    marginLeft: '15px',
    color: 'white',
    backgroundColor: 'rgba(29, 113, 183)',
    height: '170px',
    width: '310px',
    [theme.breakpoints.down('xs')]: {
      width: '250px',
      height: '190px'
    },
  }
}));

const MenuProps = {
  PaperProps: {
    style: {
      width: 150,
      maxHeight: 200,
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left"
  },
  getContentAnchorEl: null
};

const chalkedOrNot = ['Show all catcalls', 'Show chalked catcalls', 'Show not yet chalked'];


function MapFilter2 ({ setFilterOpen, categoryLibrary, filterChalked, filterCategories }) {

  const classes = useStyles();
  const [categoryName, setCategoryName] = useState([]);
  const [openChalk, setOpenChalk] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndexChalk, setSelectedIndexChalk] = useState(0);

  const handleCategoryChange = (event) => {
    setCategoryName(event.target.value);
    setSelectedIndexChalk(0);
    filterCategories(event.target.value);
  };

  const handleChalkItemClick = (event, index) => {
    setSelectedIndexChalk(index);
    setOpenChalk(false);
    setCategoryName([]);
    filterChalked(index);
  };

  const handleToggleChalk = () => {
    setOpenChalk((prevOpen) => !prevOpen);
  };

  const handleCloseChalk = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenChalk(false);
  };

  function handleExitFilter() {
    filterChalked(0);
    filterCategories([]);
    setFilterOpen(false);
  }


  return (
    <Card
      zIndex="modal" 
      className={classes.cardStyles}
    >

      <div style={{marginLeft: '15px', marginRight: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <h1 className="catcall-font">Filter catcalls</h1>
        <IconButton onClick={e => {handleExitFilter()}} style={{color: 'white'}} >
          <HighlightOffIcon />
        </IconButton>
      </div>
      
      <ButtonGroup variant="contained" color="secondary" ref={anchorRef} aria-label="split button" style={{marginLeft: '16px', marginTop: '5px', width: '90%'}}>
        <Button style={{ width: '100%'}}>{chalkedOrNot[selectedIndexChalk]}</Button>
        <Button
          color="secondary"
          size="small"
          aria-controls={openChalk ? 'split-button-menu' : undefined}
          aria-expanded={openChalk ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggleChalk}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>

      <Popper open={openChalk} anchorEl={anchorRef.current} role={undefined} transition style={{zIndex: 99}}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseChalk}>
                  <MenuList id="split-button-menu">
                    {chalkedOrNot.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndexChalk}
                        onClick={(event) => handleChalkItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        <FormControl className={classes.formControl}>
          <InputLabel id="category-checkbox-label" style={{color: 'white'}}>Filter by tag</InputLabel>
          <Select
            style={{color: 'white'}}
            labelId="category-checkbox-label"
            id="category-checkbox"
            multiple
            value={categoryName}
            onChange={handleCategoryChange}
            input={<Input />}
            renderValue={(selected) => selected.map(category => categoryLibrary[category]).join(', ')}
            MenuProps={MenuProps}
          >
            {Object.keys(categoryLibrary).map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={categoryName.indexOf(category) > -1} />
                <ListItemText primary={categoryLibrary[category]} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

    </Card>
  );
}
export default MapFilter2;