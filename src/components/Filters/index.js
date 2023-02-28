import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import DetailFilter from './Detail-Filter/';
import YearFilter from './Year-Filter';
// import UCRFilter from './UCR-Filter';

const styles = theme => ({
    root: {},
    selectContainer: {
        marginBottom: 30,
    },
    detailFilters: {
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: 4,
        boxSizing: 'border-box',
        padding: '15px 15px',
        position: 'relative',
        '&:hover': {
            borderColor: 'hsla(0, 0%, 0%, 0.54)',
        },
    },
    detailLabels: {
        position: 'absolute',
        left: 0,
        top: 0,
        transform: 'translate(14px, -12px) scale(0.75)',
        fontSize: '1.2857142857142858rem',
        color: 'hsla(0, 0%, 0%, 0.54)',
        transformOrigin: 'top left',
        backgroundColor: 'white',
        padding: '0px 5px',
        marginLeft: '-5px'
    },
    detailChatter: {
        color: '#999',
        fontStyle: 'italic',
        padding: [[20, 0]],
        boxSizing: 'border-box',
    }
});

class Filters extends React.Component {
    // handleChangeUCR = (UCR) => {
    //     this.props.onChangeUCR(UCR);
    // }

    handleChangeYear = (year) => {
        this.props.onChangeYear(year);
    }

    handleClickDetail = (ids) => {
        this.props.onClickDetail(ids);
    }

    handleClearDetail = (id) => {
        this.props.onClearDetail(id);
    }

    render() {
        const {homicides, year, classes, details, detailFiltersSpec} = this.props;
        const detailFilters = detailFiltersSpec.filters
            .map((filterSpec) => {
                const { id } = filterSpec;
                const chosen = details[id];
                return (
                    <DetailFilter
                        {...filterSpec}
                        homicides={homicides}
                        chosen={chosen}
                        onClick={this.handleClickDetail}
                        onClear={this.handleClearDetail}
                    />
                )
            });
        return (
            <div className={classes.root}>
                <div className={classes.selectContainer}>
                    <YearFilter onChange={this.handleChangeYear} value={year} />
                </div>
                <div className={classes.detailFilters}>
                    <div className={classes.detailLabels}>Details</div>
                    <div className={classes.detailChatter}>
                        Click within each box below to filter homicides by demographic and
                        incident data. Changes also appear on the map.
                    </div>
                    {detailFilters}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Filters);
