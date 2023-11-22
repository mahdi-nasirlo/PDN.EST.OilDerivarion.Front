import React, {useContext} from 'react';
import {FormBuilderContext} from "../provider/FormBuilderProvider";

const useControlFormBuilder = () => {
    return useContext(FormBuilderContext)
};

export default useControlFormBuilder;