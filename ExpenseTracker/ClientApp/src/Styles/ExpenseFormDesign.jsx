import { styled } from '@mui/system';
import { Box, Grid, TextField, Button, InputAdornment, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export const BoxContainer = styled(Box)(() => ({
    backgroundColor: '#D0F5E2',
    border: '1px solid #ccc',
    borderRadius: '5px',
    mb: 1,
}));

export const GridContainer = styled(Grid)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
    gridGap: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: '4px',
    padding: '16px',
    maxWidth: 1200,
    margin: '0 auto',
    overflow: 'hidden',
}));

export const GridItem = (props) => (
    <Grid item xs={12} sm={6} md={3}>
        {props.children}
    </Grid>
);

export const CategoryBox = (props) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
            , backgroundColor: 'white'
        }}>
        {props.children}
    </Box>
)

export const CategoryTextFields = (props) => (
    <TextField
        variant="outlined"
        size="small"
        type="text"
        fullWidth
        placeholder="Add Category"
        label={props.addCategory ? 'New Category' : 'Category'}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <Button onClick={() => props.setAddCategory(false)}>
                        <CloseIcon />
                    </Button>
                </InputAdornment>
            ),
            inputProps: { min: '0', step: '0.01' },
        }}
    />
);

export const SelectCategory = (props) => (
    <Select
        id="formSelect"
        size="small"
        displayEmpty
        fullWidth
        onChange={props.initCategoryCreation}
        value={String(props.categoryIndex)}
        renderValue={() => (props.categoryIndex === 0 ? 'Select Category' : props.categories[props.categoryIndex])}
    >
        <MenuItem value='' disabled>
            Select Category
        </MenuItem>
        {props.categories.map((category, i) => (
            <MenuItem value={String(i)} key={category + i}>
                {category}
            </MenuItem>
        ))}
        <MenuItem value={-1}>
            Add New
        </MenuItem>
    </Select>
)

export const TitleTextField = (props) => (
    <TextField
        fullWidth
        label="Title"
        variant="outlined"
        size="small"
        value={props.title}
        onChange={(e) => props.setTitle(e.target.value)}
        sx={{ backgroundColor: 'white' }}
    />

)

export const PriceTextField = (props) => (
    <TextField
        fullWidth
        onChange={(e) => props.setPrice(e.target.value)}
        label="Price"
        variant="outlined"
        size="small"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <Button variant="body2" onClick={props.changeCurrency} sx={{ px: 1, minWidth: 0 }}>
                        {props.currencies[props.currencyIndex]}
                    </Button>
                </InputAdornment>
            ),
            inputProps: { min: '0', step: '0.01' },
        }}
        sx={{ backgroundColor: 'white' }}
    />
)

export const DateTextField = (props) => (
    <TextField
        fullWidth
        label="Date"
        onChange={(e) => props.setDate(e.target.value)}
        type="date"
        variant="outlined"
        size="small"
        value={props.date}
        sx={{ backgroundColor: 'white' }}
    />
)
