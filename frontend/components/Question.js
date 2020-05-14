import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Input} from "reactstrap";

export const Question = (props) => {
    // console.log(props);
    if (props.question.type == "radio") {
        // console.log("radio"+props.question.id);
        return (
            <div style={{marginTop: "20px"}}>
                <h5>Question {props.pos}: <i>Choose the best answer: </i><br/>{props.question.question}</h5>
                <RadioGroup aria-label={"radio" + props.question.id} name={"radio" + props.question.id}
                            onChange={props.onRadioChange}>
                    <FormControlLabel style={{margin: "0px"}} value="A" control={<Radio/>}
                                      label={props.question.answerA}/>
                    <FormControlLabel style={{margin: "0px"}} value="B" control={<Radio/>}
                                      label={props.question.answerB}/>
                    <FormControlLabel style={{margin: "0px"}} value="C" control={<Radio/>}
                                      label={props.question.answerC}/>
                    <FormControlLabel style={{margin: "0px"}} value="D" control={<Radio/>}
                                      label={props.question.answerD}/>
                </RadioGroup>
            </div>
        );
    } else {
        if (props.question.type == "checkbox") {
            return (
                <div style={{marginTop: "20px"}}>
                    <h5>Question {props.pos}: <i>Choose the correct answers: </i><br/>{props.question.question}</h5>
                    <FormGroup>
                        <FormControlLabel
                            style={{margin: "0px"}}
                            control={<Checkbox onChange={props.onCheckboxChange} name={"checkbox" + props.question.id}
                                               value="A"/>}
                            label={props.question.answerA}
                        />
                        <FormControlLabel
                            style={{margin: "0px"}}
                            control={<Checkbox onChange={props.onCheckboxChange} name={"checkbox" + props.question.id}
                                               value="B"/>}
                            label={props.question.answerB}
                        />
                        <FormControlLabel
                            style={{margin: "0px"}}
                            control={<Checkbox onChange={props.onCheckboxChange} name={"checkbox" + props.question.id}
                                               value="C"/>}
                            label={props.question.answerC}
                        />
                        <FormControlLabel
                            style={{margin: "0px"}}
                            control={<Checkbox onChange={props.onCheckboxChange} name={"checkbox" + props.question.id}
                                               value="D"/>}
                            label={props.question.answerD}
                        />
                    </FormGroup>
                </div>
            );
        } else {
            return (
                <div style={{marginTop: "20px"}}>
                    <h5>Question {props.pos}: <i>Fill in the blank:</i><br/> {props.question.question}</h5>
                    <Input type="text" style={{marginTop: "10px"}} name={"text" + props.question.id}
                           onChange={props.onInputChange} placeholder="Enter your answer here"/>
                </div>
            );
        }
    }

};
