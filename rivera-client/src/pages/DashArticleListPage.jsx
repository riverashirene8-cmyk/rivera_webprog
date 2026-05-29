import { useEffect, useState } from 'react';

import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';

import { DataGrid } from '@mui/x-data-grid';

import {
    createArticle,
    fetchArticles,
    updateArticle,
} from '../services/ArticleService';

const blankForm = {
    name: '',
    title: '',
    image: '',
    content: '',
};

const DashArticleListPage = () => {
    const theme = useTheme();

    const isMobile = useMediaQuery(
        theme.breakpoints.down('sm')
    );

    const [articlesList, setArticlesList] = useState([]);
    const [serverError, setServerError] = useState('');

    const [modal, setModal] = useState({
        open: false,
        id: null,
    });

    const [form, setForm] = useState(blankForm);

    const [errors, setErrors] = useState({});

    const [search, setSearch] = useState('');

    const resetForm = () => {
        setForm({ ...blankForm });
        setErrors({});
    };

    const openModal = (article) => {
        setModal({
            open: true,
            id: article?.id ?? null,
        });

        setForm(
            article
                ? {
                    name: article.name,
                    title: article.title,
                    image: article.image || '',
                    content: Array.isArray(article.content)
                        ? article.content.join('\n\n')
                        : article.content || '',
                  }
                : { ...blankForm }
        );

        setErrors({});
    };

    const closeModal = () => {
        setModal({
            open: false,
            id: null,
        });

        resetForm();
    };

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchArticles();
                setArticlesList(data);
            } catch (error) {
                setServerError(error.message || 'Unable to load articles.');
            }
        };

        load();
    }, []);

    const handleChange = ({
        target: { name, value },
    }) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validate = () => {
        const nextErrors = {};

        const name = form.name
            .trim()
            .toLowerCase();

        [
            ['name', 'Article Name'],
            ['title', 'Title'],
            ['content', 'Content'],
        ].forEach(([key, label]) => {
            if (!String(form[key]).trim()) {
                nextErrors[key] =
                    `${label} is required.`;
            }
        });

        if (
            !nextErrors.name &&
            articlesList.some(
                (article) =>
                    article.id !== modal.id &&
                    article.name === name
            )
        ) {
            nextErrors.name =
                'Article name already exists.';
        }

        return nextErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const nextErrors = validate();

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }

        const nextArticle = {
            name: form.name.trim().toLowerCase().replace(/\s+/g, '-'),
            title: form.title.trim(),
            image: form.image,
            content: form.content
                .trim()
                .split('\n\n')
                .filter((p) => p.trim()),
        };

        try {
            const savedArticle = modal.id
                ? await updateArticle(modal.id, nextArticle)
                : await createArticle(nextArticle);

            setArticlesList((prev) =>
                modal.id
                    ? prev.map((article) =>
                          article.id === savedArticle.id
                              ? savedArticle
                              : article
                      )
                    : [...prev, savedArticle]
            );

            closeModal();
        } catch (error) {
            setServerError(error.message || 'Unable to save article.');
        }
    };

    const fieldProps = (
        name,
        label,
        extra = {}
    ) => ({
        name,
        label,
        value: form[name],
        onChange: handleChange,
        error: Boolean(errors[name]),
        helperText: errors[name],
        fullWidth: true,
        ...extra,
    });

    const filteredArticles = articlesList.filter(
        (article) => {
            const searchText =
                search.toLowerCase();

            const matchesSearch =
                article.name
                    .toLowerCase()
                    .includes(searchText) ||
                article.title
                    .toLowerCase()
                    .includes(searchText);

            return matchesSearch;
        }
    );

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
           minWidth: 70,
flex: 0.5,
        },

        {
            field: 'name',
            headerName: 'Name',
            minWidth: 200,
            flex: 1,
        },

        {
            field: 'title',
            headerName: 'Title',
            minWidth: 250,
            flex: 1.2,
        },

        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            sortable: false,

            renderCell: ({ row }) => (
                <Stack
                    direction="row"
                    spacing={1}
                >
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() =>
                            openModal(row)
                        }
                    >
                        Edit
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            {serverError ? (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setServerError('')}>
                    {serverError}
                </Alert>
            ) : null}

            <Box
                sx={{
                    mb: 3,
                    display: 'flex',
                    justifyContent:
                        'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                <Box>
                    <Typography variant="h4">
                        Articles
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Manage articles available on the public ArticleListPage.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    onClick={() =>
                        openModal()
                    }
                >
                    Add Article
                </Button>
            </Box>

            <Paper
                sx={{
                    p: 2,
                    mb: 2,
                }}
            >
                <TextField
                    fullWidth
                    label="Search"
                    placeholder="Search by name or title"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    InputProps={{
                        startAdornment:
                            (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                    }}
                />
            </Paper>

            <Paper
                sx={{
                    width: '100%',
                    overflow: 'hidden',
                }}
            >
                {filteredArticles.length ? (
                    <Box
                        sx={{
                            width: '100%',
                            overflowX: 'auto',
                        }}
                    >
                        <DataGrid
                            rows={filteredArticles}
                            columns={columns}
                            autoHeight
                            disableRowSelectionOnClick
                            pageSizeOptions={[
                                5,
                                10,
                            ]}
                            initialState={{
                                pagination: {
                                    paginationModel:
                                        {
                                            pageSize: 5,
                                            page: 0,
                                        },
                                },
                            }}
                            sx={{
                                minWidth: 800,

                                '& .MuiDataGrid-columnHeaders':
                                    {
                                        backgroundColor:
                                            '#f5f5f5',
                                    },

                                '& .MuiDataGrid-cell':
                                    {
                                        display:
                                            'flex',
                                        alignItems:
                                            'center',
                                    },

                                '& .MuiDataGrid-columnHeaderTitle':
                                    {
                                        fontWeight: 700,
                                    },
                            }}
                        />
                    </Box>
                ) : (
                    <Alert severity="info">
                        No articles found.
                    </Alert>
                )}
            </Paper>

            <Dialog
                open={modal.open}
                onClose={closeModal}
                fullWidth
                maxWidth="md"
                fullScreen={isMobile}
                disableEnforceFocus
            >
                <Box
                    component="form"
                    onSubmit={
                        handleSubmit
                    }
                >
                    <DialogTitle>
                        {modal.id
                            ? 'Edit Article'
                            : 'Add Article'}
                    </DialogTitle>

                    <DialogContent dividers>
                        <Stack
                            spacing={2}
                            sx={{ pt: 1 }}
                        >
                            <TextField
                                {...fieldProps(
                                    'name',
                                    'Article Name'
                                )}
                                placeholder="e.g., react-hooks"
                            />

                            <TextField
                                {...fieldProps(
                                    'title',
                                    'Title'
                                )}
                                placeholder="e.g., Understanding React Hooks"
                            />

                            <TextField
                                {...fieldProps(
                                    'image',
                                    'Image URL (optional)',
                                    {
                                        type: 'url',
                                    }
                                )}
                                placeholder="https://example.com/image.png"
                            />

                            <TextField
                                {...fieldProps(
                                    'content',
                                    'Content',
                                    {
                                        multiline: true,
                                        rows: 8,
                                    }
                                )}
                                placeholder="Enter article content. Separate paragraphs with two line breaks."
                            />
                        </Stack>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick={
                                closeModal
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                        >
                            {modal.id
                                ? 'Update Article'
                                : 'Save Article'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default DashArticleListPage;
