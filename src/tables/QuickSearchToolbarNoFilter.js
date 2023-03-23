// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { GridToolbarFilterButton } from '@mui/x-data-grid'
import { SearchWeb, Close } from 'mdi-material-ui'



const QuickSearchToolbarNoFilter = ({searchText,handleSearch,clearSearch}) => {
  return (
    <Box
      sx={{
        marginLeft:"-20px",
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: theme => theme.spacing(2, 5, 4, 5)
      }}
    >
      {/* <GridToolbarFilterButton /> */}
      <TextField
        size='small'
        value={searchText}
        onChange={(event) =>handleSearch(event.target.value)}
        placeholder='Arama'
        InputProps={{
          startAdornment: (
            <Box sx={{ mr: 2, display: 'flex' }}>
              <SearchWeb fontSize={20} />
            </Box>
          ),
          endAdornment: (
            <IconButton size='small' title='Clear' aria-label='Clear' onClick={clearSearch}>
              <Close fontSize={20} />
            </IconButton>
          )
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto'
          },
          '& .MuiInputBase-root > svg': {
            mr: 2
          }
        }}
      />
    </Box>
  )
}

export default QuickSearchToolbarNoFilter
