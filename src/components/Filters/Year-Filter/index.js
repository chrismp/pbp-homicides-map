import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    formControl: {
        marginRight: 10,
        marginTop: 25,
    },
    label: {
        color: '#999',
    },
});

class YearFilter extends React.Component {
    handleChange = event => {
        const year = +event.target.value;
        this.props.onChange(year);
    };

    render() {
        const {classes} = this.props;
        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                    ref={ref => {
                        this.InputLabelRef = ref;
                    }}
                    htmlFor="date-input"
                >
                    Date
                </InputLabel>
                <Select
                    native
                    onChange={this.handleChange}
                    input={
                    <OutlinedInput
                        name="date"
                        labelWidth={50}
                        id="date-input"
                    />
                    }
                >
                    <option value="2023">2023 to date</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                </Select>
            </FormControl>
        )
    }
}

export default withStyles(styles)(YearFilter);
