import React from 'react';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, ListItem, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Box } from '@material-ui/core';
import _ from 'underscore';

import { HEAD_CELLS } from '../../constants';
import EnhancedTableHead from './EnhancedTableHead';

function descendingComparator(a, b, orderBy) {
    const valueExtractorFunction = _.property(orderBy);
    const aValue = valueExtractorFunction(a);
    const bValue = valueExtractorFunction(b);
    if (bValue < aValue) {
        return -1;
    }
    if (bValue > aValue) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


const EnhancedTable = ({ rows }) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('artist');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Box>
            <TableContainer>
                <Table aria-label='simfile table'>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" key={row.songArtist}>
                                        {HEAD_CELLS.map((column) => {
                                            var value = _.property(column.id)(row);
                                            var diffs = []
                                            for (const [difficulty, val] of Object.entries(row.difficultyMap)) {
                                                diffs.push([difficulty, val])
                                            }
                                            let sortedDiffs = _.sortBy(diffs, '1')
                                            console.log(sortedDiffs)
                                            var difflist = sortedDiffs.map(
                                                ([difficulty, val]) => (
                                                    <ListItem >
                                                        {difficulty}: {val}
                                                    </ListItem>
                                                )
                                            )
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    size='small'
                                                >
                                                    {column.id === 'difficultyMap' ?
                                                        <ExpansionPanel className='difficultiesPanel'>
                                                            <ExpansionPanelSummary
                                                                expandIcon={<MusicNoteIcon />}
                                                                className='summaryPanel'
                                                            >
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails className='detailsPanel'>
                                                                <Typography>
                                                                    {difflist}
                                                                </Typography>
                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                        :
                                                        <Typography>{value}</Typography>
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Box>
    );
}

export default EnhancedTable;