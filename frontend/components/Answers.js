 import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const Answers = (props) => {
	return (
		     
		<RadioGroup aria-label={props.res.id} name={props.res.id} onChange={props.onChange}>
		<FormControlLabel style={{margin: "0px"}} value="A" control={<Radio />} label={props.res.answerA} />
		<FormControlLabel style={{margin: "0px"}} value="B" control={<Radio />} label={props.res.answerB} />
		<FormControlLabel style={{margin: "0px"}} value="C" control={<Radio />} label={props.res.answerC} />
		<FormControlLabel style={{margin: "0px"}} value="D" control={<Radio />} label={props.res.answerD} />
		</RadioGroup>
	
	)
};
