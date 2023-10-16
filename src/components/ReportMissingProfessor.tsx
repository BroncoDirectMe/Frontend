import React, { useState } from 'react';
import { useForm, UseFormRegister, FieldError } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';

import {
  Grid,
  Typography,
  Button,
  TextField,
  Modal,
  Tooltip,
} from '@mui/material';
import '../styles/ReportMissingProfessor.css';

interface IFormInputs {
  name: string;
  department: string;
}

interface CustomTextFieldProps {
  label: string;
  text: string;
  placeholder: string;
  register: UseFormRegister<IFormInputs>;
  title: string;
  errorField: FieldError | undefined;
  fieldName: 'name' | 'department';
}

/**
 * Missing professor report component constructor
 * @param props.openForm - Open form if boolean value is true
 * @returns {JSX.Element} - Missing professor report component
 */
export default function ReportMissingProfesor(props: {
  openForm: boolean;
}): JSX.Element {
  const [reportState, setReportState] = useState(false);
  const [submitState, setSubmitState] = useState(false);

  const handleButtonClick = () => {
    setReportState(true);
    if (!props.openForm) setSubmitState(true);
  };

  const handleOnCancel = () => {
    setReportState(false);
  };

  /**
   * Error icon pop up component constructor
   * @param props.title - Tooltip's title
   * @returns {JSX.Element} - Error icon component
   */
  const InvalidError = (props: { title: string }): JSX.Element => {
    return (
      <Tooltip title={props.title}>
        <ErrorIcon color="error" />
      </Tooltip>
    );
  };

  /**
   * Custom text field component constructor
   * @param {CustomTextFieldProps} props - The props object containing custom text field's args
   * @returns {JSX.Element} - Custom text field component
   */
  const CustomTextField = (props: CustomTextFieldProps): JSX.Element => {
    const [text, setText] = useState(props.text);

    function handleTextChange(event: any) {
      if (event.target.value.length > 40) return;
      setText(event.target.value);
    }

    return (
      <TextField
        fullWidth
        value={text}
        placeholder={props.placeholder}
        label={props.label}
        {...props.register(props.fieldName, {
          required: true,
          onChange: (e) => {
            handleTextChange(e);
          },
        })}
        {...(props.errorField && {
          color: 'error',
          InputProps: {
            endAdornment: <InvalidError title={props.title + ' is required'} />,
          },
        })}
      />
    );
  };

  /**
   * Text field form component constructor
   * @returns {JSX.Element} - Text field form component
   */
  const TextFieldForm = (): JSX.Element => {
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm<IFormInputs>();
    return (
      <Grid item container xs={12} id="form-container">
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            setReportState(false);
            setSubmitState(true);
          })}
        >
          <Grid item container id="form-component-container">
            <Grid item container xs={12} id="form-header-container">
              <Typography fontWeight="bold" fontSize="17px">
                Missing Professor Report
              </Typography>
            </Grid>
            <CustomTextField
              label="Name*"
              text=""
              placeholder="Enter professor's name"
              register={register}
              title="Name"
              errorField={errors.name}
              fieldName="name"
            />
            <CustomTextField
              label="Department*"
              text=""
              placeholder="Enter professor's department"
              register={register}
              title="Department"
              errorField={errors.department}
              fieldName="department"
            />
            <Grid item container xs={12} id="form-button-container">
              <Button onClick={handleOnCancel}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    );
  };

  /**
   * Missing professor form component constructor
   * @returns {JSX.Element} - Missing professor form component
   */
  const MissingProfessorForm = (): JSX.Element => {
    return (
      <Modal open={reportState} id="modal-form">
        <Grid container id="modal-form-container">
          <TextFieldForm />
        </Grid>
      </Modal>
    );
  };

  return (
    <Grid container id="button-container">
      {submitState ? (
        <Typography fontSize="15px" fontWeight="bold" color="#3cb043">
          Missing Professor Report submitted!
        </Typography>
      ) : (
        <Button onClick={handleButtonClick} id="button">
          <Typography fontSize="13px"> Report Missing Professor </Typography>
        </Button>
      )}
      {props.openForm && <MissingProfessorForm />}
    </Grid>
  );
}
