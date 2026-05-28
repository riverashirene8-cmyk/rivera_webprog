import { useState } from 'react';

import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';

import { DataGrid } from '@mui/x-data-grid';

import usersSeed from '../../data/users.json?raw';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    role: 'editor',
    username: '',
    password: '',
    address: '',
    isActive: true,
};

const labelize = (value) =>
    value
        ? `${value.charAt(0).toUpperCase()}${value.slice(1)}`
        : '';

const loadUsers = () => {
    try {
        return {
            users: JSON.parse(usersSeed).map((user, index) => ({
                id: Number(user.id) || index + 1,

                firstName: String(user.firstName ?? '').trim(),

                lastName: String(user.lastName ?? '').trim(),

                age: String(user.age ?? '').trim(),

                gender: genders.includes(
                    String(user.gender ?? '')
                        .trim()
                        .toLowerCase()
                )
                    ? String(user.gender ?? '')
                          .trim()
                          .toLowerCase()
                    : '',

                contactNumber: String(
                    user.contactNumber ?? ''
                ).trim(),

                email: String(user.email ?? '')
                    .trim()
                    .toLowerCase(),

                role: roles.includes(
                    String(user.role ?? '')
                        .trim()
                        .toLowerCase()
                )
                    ? String(user.role ?? '')
                          .trim()
                          .toLowerCase()
                    : 'editor',

                username: String(user.username ?? '')
                    .trim()
                    .toLowerCase(),

                password: String(user.password ?? ''),

                address: String(user.address ?? '').trim(),

                isActive:
                    typeof user.isActive === 'boolean'
                        ? user.isActive
                        : true,
            })),

            error: '',
        };
    } catch {
        return {
            users: [],
            error:
                'Unable to load users from src/data/users.json.',
        };
    }
};

const seed = loadUsers();

const UsersPage = () => {
    const theme = useTheme();

    const isMobile = useMediaQuery(
        theme.breakpoints.down('sm')
    );

    const [users, setUsers] = useState(seed.users);

    const [modal, setModal] = useState({
        open: false,
        id: null,
    });

    const [form, setForm] = useState(blankForm);

    const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] =
        useState(false);

    // SEARCH + FILTER STATES

    const [search, setSearch] = useState('');

    const [roleFilter, setRoleFilter] =
        useState('');

    const [genderFilter, setGenderFilter] =
        useState('');

    const [statusFilter, setStatusFilter] =
        useState('');

    const resetForm = () => {
        setForm({ ...blankForm });
        setErrors({});
    };

    const openModal = (user) => {
        setModal({
            open: true,
            id: user?.id ?? null,
        });

        setForm(
            user
                ? { ...blankForm, ...user }
                : { ...blankForm }
        );

        setErrors({});
    };

    const closeModal = () => {
        setModal({
            open: false,
            id: null,
        });

        setShowPassword(false);

        resetForm();
    };

    const handleChange = ({
        target: { name, value, checked, type },
    }) => {
        setForm((prev) => ({
            ...prev,
            [name]:
                type === 'checkbox'
                    ? checked
                    : value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    // VALIDATION

    const validate = () => {
        const nextErrors = {};

        const email = form.email
            .trim()
            .toLowerCase();

        const username = form.username
            .trim()
            .toLowerCase();

        [
            ['firstName', 'First name'],
            ['lastName', 'Last name'],
            ['age', 'Age'],
            ['gender', 'Gender'],
            ['contactNumber', 'Contact number'],
            ['email', 'Email'],
            ['role', 'Role'],
            ['username', 'Username'],
            ['password', 'Password'],
            ['address', 'Address'],
        ].forEach(([key, label]) => {
            if (!String(form[key]).trim()) {
                nextErrors[key] =
                    `${label} is required.`;
            }
        });

        // EMAIL FORMAT

        if (
            !nextErrors.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                email
            )
        ) {
            nextErrors.email =
                'Enter a valid email address.';
        }

        // EMAIL UNIQUE

        if (
            !nextErrors.email &&
            users.some(
                (user) =>
                    user.id !== modal.id &&
                    user.email === email
            )
        ) {
            nextErrors.email =
                'Email address already exists.';
        }

        // USERNAME UNIQUE

        if (
            !nextErrors.username &&
            users.some(
                (user) =>
                    user.id !== modal.id &&
                    user.username === username
            )
        ) {
            nextErrors.username =
                'Username already exists.';
        }

        // PASSWORD 8 CHARACTERS

        if (
            !nextErrors.password &&
            form.password.length < 8
        ) {
            nextErrors.password =
                'Password must be at least 8 characters.';
        }

        // CONTACT NUMBER 11 DIGITS

        if (
            !nextErrors.contactNumber &&
            !/^\d{11}$/.test(
                form.contactNumber
            )
        ) {
            nextErrors.contactNumber =
                'Contact number must be exactly 11 digits.';
        }

        // AGE NUMBER ONLY

        if (
            !nextErrors.age &&
            !/^\d+$/.test(form.age)
        ) {
            nextErrors.age =
                'Age must contain numbers only.';
        }

        // USERNAME NO SPACES

        if (
            !nextErrors.username &&
            /\s/.test(form.username)
        ) {
            nextErrors.username =
                'Username must not contain spaces.';
        }

        return nextErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const nextErrors = validate();

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }

        const nextUser = {
            firstName:
                form.firstName.trim(),

            lastName:
                form.lastName.trim(),

            age: form.age.trim(),

            gender: form.gender
                .trim()
                .toLowerCase(),

            contactNumber:
                form.contactNumber.trim(),

            email: form.email
                .trim()
                .toLowerCase(),

            role: form.role
                .trim()
                .toLowerCase(),

            username: form.username
                .trim()
                .toLowerCase(),

            password: form.password,

            address:
                form.address.trim(),

            isActive: form.isActive,
        };

        setUsers((prev) =>
            modal.id
                ? prev.map((user) =>
                      user.id === modal.id
                          ? {
                                ...user,
                                ...nextUser,
                            }
                          : user
                  )
                : [
                      ...prev,
                      {
                          id:
                              prev.reduce(
                                  (max, user) =>
                                      Math.max(
                                          max,
                                          Number(
                                              user.id
                                          ) || 0
                                      ),
                                  0
                              ) + 1,

                          ...nextUser,
                      },
                  ]
        );

        closeModal();
    };

    const toggleStatus = (id) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === id
                    ? {
                          ...user,
                          isActive:
                              !user.isActive,
                      }
                    : user
            )
        );
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

    // FILTER USERS

    const filteredUsers = users.filter(
        (user) => {
            const searchText =
                search.toLowerCase();

            const matchesSearch =
                user.firstName
                    .toLowerCase()
                    .includes(searchText) ||
                user.lastName
                    .toLowerCase()
                    .includes(searchText) ||
                user.email
                    .toLowerCase()
                    .includes(searchText) ||
                user.username
                    .toLowerCase()
                    .includes(searchText);

            const matchesRole =
                roleFilter === '' ||
                user.role === roleFilter;

            const matchesGender =
                genderFilter === '' ||
                user.gender ===
                    genderFilter;

            const matchesStatus =
                statusFilter === '' ||
                (statusFilter === 'active'
                    ? user.isActive
                    : !user.isActive);

            return (
                matchesSearch &&
                matchesRole &&
                matchesGender &&
                matchesStatus
            );
        }
    );

    // TABLE COLUMNS

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
        },

        {
            field: 'fullName',
            headerName: 'Full Name',
            minWidth: 180,
            flex: 1,

            valueGetter: (_, row) =>
                `${row.firstName} ${row.lastName}`,
        },

        {
            field: 'username',
            headerName: 'Username',
            minWidth: 150,
            flex: 1,
        },

        {
            field: 'email',
            headerName: 'Email',
            minWidth: 230,
            flex: 1.3,
        },

        {
            field: 'role',
            headerName: 'Role',
            minWidth: 120,

            valueGetter: (_, row) =>
                labelize(row.role),
        },

        {
            field: 'status',
            headerName: 'Status',
            minWidth: 120,

            renderCell: ({ row }) => (
                <Chip
                    size="small"
                    label={
                        row.isActive
                            ? 'Active'
                            : 'Inactive'
                    }
                    color={
                        row.isActive
                            ? 'success'
                            : 'default'
                    }
                />
            ),
        },

        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 230,
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

                    <Button
                        size="small"
                        variant="contained"
                        color={
                            row.isActive
                                ? 'warning'
                                : 'success'
                        }
                        onClick={() =>
                            toggleStatus(
                                row.id
                            )
                        }
                    >
                        {row.isActive
                            ? 'Disable'
                            : 'Activate'}
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            {/* HEADER */}

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
                <Typography variant="h4">
                    Users
                </Typography>

                <Button
                    variant="contained"
                    onClick={() =>
                        openModal()
                    }
                >
                    Add User
                </Button>
            </Box>

            {seed.error ? (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                >
                    {seed.error}
                </Alert>
            ) : null}

            {/* SEARCH + FILTERS */}

            <Paper
                sx={{
                    p: 2,
                    mb: 2,
                }}
            >
                <Stack
                    direction={{
                        xs: 'column',
                        md: 'row',
                    }}
                    spacing={2}
                >
                    <TextField
                        fullWidth
                        label="Search"
                        placeholder="Search by first name, last name, email or username"
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

                    <TextField
                        select
                        label="Role"
                        value={roleFilter}
                        onChange={(e) =>
                            setRoleFilter(
                                e.target.value
                            )
                        }
                        sx={{
                            minWidth: 150,
                        }}
                    >
                        <MenuItem value="">
                            All
                        </MenuItem>

                        {roles.map((role) => (
                            <MenuItem
                                key={role}
                                value={role}
                            >
                                {labelize(role)}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Gender"
                        value={genderFilter}
                        onChange={(e) =>
                            setGenderFilter(
                                e.target.value
                            )
                        }
                        sx={{
                            minWidth: 150,
                        }}
                    >
                        <MenuItem value="">
                            All
                        </MenuItem>

                        {genders.map(
                            (gender) => (
                                <MenuItem
                                    key={gender}
                                    value={
                                        gender
                                    }
                                >
                                    {labelize(
                                        gender
                                    )}
                                </MenuItem>
                            )
                        )}
                    </TextField>

                    <TextField
                        select
                        label="Status"
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                        sx={{
                            minWidth: 150,
                        }}
                    >
                        <MenuItem value="">
                            All
                        </MenuItem>

                        <MenuItem value="active">
                            Active
                        </MenuItem>

                        <MenuItem value="inactive">
                            Inactive
                        </MenuItem>
                    </TextField>
                </Stack>
            </Paper>

            {/* TABLE */}

            <Paper
                sx={{
                    width: '100%',
                    overflow: 'hidden',
                }}
            >
                {filteredUsers.length ? (
                    <Box
                        sx={{
                            width: '100%',
                            overflowX: 'auto',
                        }}
                    >
                        <DataGrid
                            rows={filteredUsers}
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
                                minWidth: 1000,

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
                        No users found.
                    </Alert>
                )}
            </Paper>

            {/* MODAL */}

            <Dialog
                open={modal.open}
                onClose={closeModal}
                fullWidth
                maxWidth="md"
                fullScreen={isMobile}
            >
                <Box
                    component="form"
                    onSubmit={
                        handleSubmit
                    }
                >
                    <DialogTitle>
                        {modal.id
                            ? 'Edit User'
                            : 'Add User'}
                    </DialogTitle>

                    <DialogContent dividers>
                        <Stack
                            spacing={2}
                            sx={{ pt: 1 }}
                        >
                            <Stack
                                direction={{
                                    xs: 'column',
                                    sm: 'row',
                                }}
                                spacing={2}
                            >
                                <TextField
                                    {...fieldProps(
                                        'firstName',
                                        'First Name'
                                    )}
                                />

                                <TextField
                                    {...fieldProps(
                                        'lastName',
                                        'Last Name'
                                    )}
                                />
                            </Stack>

                            <Stack
                                direction={{
                                    xs: 'column',
                                    sm: 'row',
                                }}
                                spacing={2}
                            >
                                <TextField
                                    {...fieldProps(
                                        'age',
                                        'Age'
                                    )}
                                />

                                <TextField
                                    {...fieldProps(
                                        'gender',
                                        'Gender',
                                        {
                                            select: true,
                                        }
                                    )}
                                >
                                    {genders.map(
                                        (
                                            gender
                                        ) => (
                                            <MenuItem
                                                key={
                                                    gender
                                                }
                                                value={
                                                    gender
                                                }
                                            >
                                                {labelize(
                                                    gender
                                                )}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </Stack>

                            <Stack
                                direction={{
                                    xs: 'column',
                                    sm: 'row',
                                }}
                                spacing={2}
                            >
                                <TextField
                                    {...fieldProps(
                                        'contactNumber',
                                        'Contact Number'
                                    )}
                                />

                                <TextField
                                    {...fieldProps(
                                        'email',
                                        'Email',
                                        {
                                            type: 'email',
                                        }
                                    )}
                                />
                            </Stack>

                            <Stack
                                direction={{
                                    xs: 'column',
                                    sm: 'row',
                                }}
                                spacing={2}
                            >
                                <TextField
                                    {...fieldProps(
                                        'role',
                                        'Role',
                                        {
                                            select: true,
                                        }
                                    )}
                                >
                                    {roles.map(
                                        (
                                            role
                                        ) => (
                                            <MenuItem
                                                key={
                                                    role
                                                }
                                                value={
                                                    role
                                                }
                                            >
                                                {labelize(
                                                    role
                                                )}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>

                                <TextField
                                    {...fieldProps(
                                        'username',
                                        'Username'
                                    )}
                                />
                            </Stack>

                            <TextField
                                {...fieldProps(
                                    'password',
                                    'Password',
                                    {
                                        type:
                                            showPassword
                                                ? 'text'
                                                : 'password',

                                        InputProps:
                                            {
                                                endAdornment:
                                                    (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={() =>
                                                                    setShowPassword(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            !prev
                                                                    )
                                                                }
                                                            >
                                                                {showPassword ? (
                                                                    <VisibilityOff />
                                                                ) : (
                                                                    <Visibility />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                            },
                                    }
                                )}
                            />

                            <TextField
                                {...fieldProps(
                                    'address',
                                    'Address',
                                    {
                                        multiline: true,
                                        rows: 3,
                                    }
                                )}
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        name="isActive"
                                        checked={
                                            form.isActive
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />
                                }
                                label={
                                    form.isActive
                                        ? 'Active'
                                        : 'Inactive'
                                }
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
                                ? 'Update User'
                                : 'Save User'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default UsersPage;