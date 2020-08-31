import React from 'react';
import _ from 'underscore';
import { Box, CircularProgress } from '@material-ui/core';

import EnhancedTable from './EnhancedTable';

export default ({ simfileResults, isLoading }) => {
    const LoadingWheel = () => {
        return (
            <div className='loadingWheel'>
                <CircularProgress />
            </div>
        )
    }

    var rows = _.values(simfileResults);

    return (
        <Box>
            {isLoading === false ? <EnhancedTable rows={rows} /> : <LoadingWheel />}
        </Box>
    )
}
