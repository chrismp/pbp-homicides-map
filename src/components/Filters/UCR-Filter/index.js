import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    label: {
        color: '#999',
    },
    formControl: {
        marginTop: 25,
    },
});

class UCRFilter extends React.Component {
    handleChange = event => {
        const UCR = event.target.value === 'ucr';
        this.props.onChange(UCR);
    };

    render() {
        const {classes} = this.props;
        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                    ref={ref => {
                        this.InputLabelRef = ref;
                    }}
                    htmlFor="ucr-input"
                >
                    UCR
                </InputLabel>
                <Select
                    native
                    onChange={this.handleChange}
                    input={
                    <OutlinedInput
                        name="ucr"
                        labelWidth={50}
                        id="ucr-input"
                    />
                    }
                >
                    <option value="ucr">UCR homicides</option>
                    <option value="all">All homicides</option>
                </Select>
            </FormControl>
        )
    }
}

export default withStyles(styles)(UCRFilter);
