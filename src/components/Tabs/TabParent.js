import React, {useState} from "react";

const TabParent = ({children}) => {

    const [activeTab, setActiveTab] = useState('first');

    const onSetActiveTab = (tabLabel) => setActiveTab(tabLabel);

    const isTabActive = (tabLabel) => tabLabel === activeTab;

    return (
        <>
            <div>
                {
                    children.map((children, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => onSetActiveTab(children.props.label)}
                            >
                                <h1
                                    style={{color: isTabActive(children.props.label) ? 'red' : 'black'}}
                                >
                                    {
                                        children.props.label
                                    }
                                </h1>
                                {
                                    isTabActive(children.props.label) && (
                                        children.props.content
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default TabParent;