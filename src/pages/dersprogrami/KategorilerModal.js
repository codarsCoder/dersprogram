import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import useAxios from '../api/axiosWithToken';
import { toast } from 'react-toastify';
import { CardHeader, Divider, IconButton } from '@mui/material';
import { DeleteCircleOutline, Plus } from 'mdi-material-ui';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function KategorilerModal({ open, setOpen, setCategories }) {

    const { axiosWithToken } = useAxios();

    const [inputs, setInputs] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [categoriesC, setCategoriesC] = useState()

    const handleClose = () => (setOpen(false), setInputs([]));
    const handleOpen = () => setOpen(true);

    const handleAddInput = () => {
        const newInput = {
            id: Date.now(),
            value: inputValue,
        };
        setInputs([...inputs, newInput]);
        setInputValue('');
    };

    const handleDeleteInput = (idToDelete) => {
        const updatedInputs = inputs.filter((input) => input.id !== idToDelete);
        setInputs(updatedInputs);
    };

    useEffect(() => {

        const getCategories = async () => {
            try {
                const { data } = await axiosWithToken.post('', {
                    query: 'select',
                    service: 'kategori'
                });
                if (data.status) {
                    setCategoriesC(data.data.kategoriler)
                }

            } catch (error) {
                console.error(error);
            }
        }
        getCategories();


    }, [])


    const handleSubmit = async () => {

        try {
            const { data } = await axiosWithToken.post('', {
                query: 'insert',
                service: 'kategori',
                kategori_adi: inputs.filter(item => item.value != "").map(item => item.value),
                alt_kategori: ""
            });
            if (data.status) {
                toast.success("Kategori(ler) Eklendi.")
                setCategoriesC(data.data.kategoriler)
                setCategories(data.data.kategoriler)
                setInputs([])
              
            }

        } catch (error) {
            console.error(error);
        }

    };


    const handleDeleteKategori = async (id) => {

        try {
            const { data } = await axiosWithToken.post('', {
                query: 'delete',
                service: 'kategori',
                id: id
            });
            if (data.status) {
                toast.success("Kategori slindi.")
                setCategoriesC(data.data.kategoriler)
                setCategories(data.data.kategoriler)
            }

        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Card sx={style}>
                 
                    <CardContent sx={{ overflowY: 'auto' , maxHeight:"500px" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Ders Ekle/Sil
                        </Typography>
                        <Typography><small>Silinen dersler artık ders programında gözükmeyecektir.</small></Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {inputs.map((input) => (
                                <Box sx={{ marginTop: "10px" }} key={input.id}>
                                    <TextField
                                        label="Ders Adı Ekle"
                                        variant="outlined"
                                        value={input.value}
                                        onChange={(e) => {
                                            const updatedInputs = inputs?.map((i) => {
                                                if (i.id === input.id) {
                                                    return {
                                                        ...i,
                                                        value: e.target.value,
                                                    };
                                                }
                                                
                                                return i;
                                            });
                                            setInputs(updatedInputs);
                                        }}
                                    />
                                    <Button onClick={() => handleDeleteInput(input.id)}>Kaldır</Button>
                                </Box>
                            ))}
                            <Box sx={{ marginTop: "10px" }}>

                                < Plus className='add-button' onClick={handleAddInput}/>
                            </Box>
                        </Typography>
                        <Divider/>
                        <Box>
                            {categoriesC?.map((ctgr) => (
                                <Box  display="flex" justifyContent="space-between" sx={{ marginTop: "10px" }} key={ctgr.id}>
                                    <Typography>{ctgr.kategori_adi} </Typography>
                                    <IconButton onClick={() => handleDeleteKategori(ctgr.id)} size="medium">
                            <DeleteCircleOutline className='sil-button' />
                          </IconButton>
                                </Box>
                            ))}
                            </Box>
                           
                      
                    </CardContent>
                    <Box display="flex" justifyContent="space-between">
                        <Button variant="contained" color='success' onClick={handleClose}>Kapat</Button>
                        <Button variant="contained" onClick={handleSubmit}>EKLE</Button>
                    </Box>
                </Card>
            </Modal>
        </div>
    );
}
