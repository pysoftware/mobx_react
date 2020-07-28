import React from 'react';
import './App.css';
import TabParent from "./components/Tabs/TabParent";
import TabItem from "./components/Tabs/TabItem";
import TaskItem from './components/Tasks/TaskItem/TaskItem';

const TabContent = ({text}) => (
    <div>
        <h4>
            {text}
        </h4>
    </div>
);

const App = () => {
    return (
        <div className="App">
            <TabParent>
                <TabItem
                    label={'first'}
                    content={<TabContent text={'First tab'}/>}
                />
                <TabItem
                    label={'second'}
                    content={<TabContent text={'Second tab'}/>}
                />
                <TabItem
                    label={'third'}
                    content={<TabContent text={'Third tab'}/>}
                />
                <TabItem
                    label={'fourth'}
                    content={<TabContent text={'Fourth tab'}/>}
                />
            </TabParent>
        </div>
    );
}


export default App;
