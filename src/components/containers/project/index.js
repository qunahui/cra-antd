import React, { useEffect, useState } from 'react';
import { ProjectForm } from 'components';
import { useHistory, useLocation } from 'react-router-dom';
import { last } from 'lodash';
import { useDebounce } from 'react-use';
import { createProject, getProject } from 'src/services/apis';
import moment from 'moment';

const ProjectContainer = ({ props }) => {
  const location = useLocation();
  const history = useHistory();
  const id = last(location.pathname.split('/'));
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(null);

  useEffect(() => {
    if (id && id !== 'create') {
      getProject(id).then((res) => {
        const project = res?.project;
        console.log(project);
        if (project) {
          setInitialValues({
            ...project,
            rangeTime: [moment(project.startDate), moment(project.endDate)],
          });
        }
      });
    }
  }, []);

  useDebounce(
    () => {
      if (saveSuccess) {
        history.push('/projects');
      }
    },
    500,
    [saveSuccess]
  );

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await createProject(values);
      setSaveSuccess(true);
    } catch (e) {
      setSaveSuccess(false);
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ProjectForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        loading={loading}
        saveSuccess={saveSuccess}
      />
    </div>
  );
};

export default ProjectContainer;
