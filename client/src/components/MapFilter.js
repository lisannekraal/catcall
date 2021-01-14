import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
}));

const ITEM_HEIGHT = 88;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  'Sexual harassment', 'Homophobia', 'Transphobia', 'Fatphobia', 'Racism', 'Fetishization', 'Slutshaming', 'HateSpeech', 'Young', 'Assault', 'Staring', 'Following'
];

const chalkedOrNot = ['Show all catcalls', 'Show chalked catcalls', 'Show not yet chalked'];

function MapFilter () {
  const classes = useStyles();
  const [categoryName, setCategoryName] = useState([]);
  const [openChalk, setOpenChalk] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndexChalk, setSelectedIndexChalk] = useState(0);

  const handleCategoryChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleChalkClick = () => {
    console.info(`You clicked ${chalkedOrNot[selectedIndexChalk]}`);
  };

  const handleChalkItemClick = (event, index) => {
    setSelectedIndexChalk(index);
    setOpenChalk(false);
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


  return (
    <>
      <div style={{textAlign: 'center'}}>

        <ButtonGroup variant="contained" color="secondary" ref={anchorRef} aria-label="split button" style={{marginTop: '16px'}}>

          <Button onClick={handleChalkClick} style={{ width: '235px'}}>{chalkedOrNot[selectedIndexChalk]}</Button>

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

        <Popper open={openChalk} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex: 1}}>
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
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={categoryName.indexOf(category) > -1} />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>


    </>
  );
}
export default MapFilter;