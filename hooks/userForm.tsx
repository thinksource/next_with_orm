import {ReactChild, useCallback, useState} from 'react';
import * as React from 'react';
// import {AxiosResponse} from 'axios';
import cs from 'classnames';

type Field<T> = {
  label: string,
  type: 'text' | 'password' | 'textarea',
  key: keyof T,
  className?: string
};

interface useFormOptions<T>  {
  initFormData: T;
  fields: Field<T>[];
  buttons: ReactChild;
  submit: {
    request: (formData: T) => Promise<AxiosResponse<T>>;
    success: () => void;
  }
}

export function userForm<T>(options: useFormOptions<T>) {
  // 非受控
  const {initFormData, fields, buttons, submit} = options;
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(() => {
    const e: { [k in keyof T]?: string[] } = {};
    (Object.keys(initFormData) as Array<keyof T>)
      .map((key) => {e[key] = [];});
    return e;
  });

  const onChange = useCallback((key: keyof T, value: any) => {
    setFormData({...formData, [key]: value});
  }, [formData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    submit.request(formData).then(() => {
      submit.success();
    }, (error) => {
      if (error.response) {
        const response: AxiosResponse = error.response;
        if (response.status === 422) {
          setErrors(response.data);
        } else if (response.status === 401) {
          window.alert('Please login in');
          window.location.href = `/sign_in?returnTo=${encodeURIComponent(window.location.pathname)}`;
        }
      }
    });
  }, [submit, formData]);

  const form = (
    <form onSubmit={handleSubmit}>
      {fields.map(field =>
        <div key={field.key.toString()} className={cs(`field-${field.key}`, field.className)}>
          <label className="label">
            <span className="label-text">
            {field.label}
            </span>
            {field.type === 'textarea'
              ? <textarea className="control"
                          onChange={(e) => onChange(field.key, e.target.value)}
                          value={formData[field.key].toString()}/>
              : <input className="control"
                       type={field.type} value={formData[field.key].toString()}
                       onChange={(e) => onChange(field.key, e.target.value)}/>}
          </label>
          {errors[field.key]?.length > 0 && <div>
            {errors[field.key].join(',')}
          </div>}
        </div>
      )}

      <div>
        {buttons}
      </div>
      <style jsx>{`
      .field{
        margin: 8px 0;
      }
      .label {
        display: flex;
        line-height: 32px;
        margin-bottom: 24px;
      }
      .label input {
        height: 32px;
      }
      .label > .label-text{
        white-space: nowrap;
        margin-right: 1em;
      }
      .label > .control{
        width: 100%;
      }
      `}</style>
    </form>
  );
  return {
    form: form, setErrors: setErrors
  };
}