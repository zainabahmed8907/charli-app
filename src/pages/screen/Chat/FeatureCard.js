import { Button } from 'antd';
import React from 'react'

const FeatureCard = ({ item, onCancel, onSend, selectedFeatureData, instantCommand, con, user, id,

    onmodalAction }) => {

    let name = instantCommand[selectedFeatureData.name]?.name;
    let description = instantCommand[selectedFeatureData.name]?.description;

    console.log("feature card name", name);
    return (
        <div className='feature-card' id={id}>

            <div
                style={
                    {
                        backgroundColor: "#f0f0f0",
                        padding: "15px",
                        borderRadius: "10px",

                    }
                }>
                <h6 style={{ fontWeight: 'bold', marginLeft: "10px" }}>
                    {selectedFeatureData[name]}

                </h6>
                <div
                    style={{
                        borderRadius: "10px",
                        backgroundColor: "white",
                        padding: "10px",
                        marginTop: "10px",
                    }}>
                    <img
                        src={item?.data?.image_url ?? ''}
                        width="35"
                        alt=""
                    />
                    <h6 style={{ fontWeight: 'bold' }}>
                        {'Card Title'}
                    </h6>
                    <h6
                        numberOfLines={6}
                        style={{ marginTop: 5, color: 'gray' }}
                        variant="h6">
                        {selectedFeatureData[name]}
                    </h6>
                </div>
                <div
                    style={{
                        borderRadius: "10px",
                        backgroundColor: "white",
                        padding: "10px",
                        marginTop: "10px",
                        marginBottom: "10px"
                    }}>
                    <h6 style={{ fontWeight: 'bold' }}>
                        {'Card Description'}
                    </h6>
                    <h6
                        style={{ marginTop: "5px", color: 'gray' }}
                    >
                        {selectedFeatureData[description]?.length <= 27 ? selectedFeatureData[description]
                            : selectedFeatureData[description]?.slice(1, 28)
                        }
                    </h6>
                </div>
                <div style={{
                    display: "flex", flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}>
                    <div>
                        <Button
                            onClick={onCancel}
                            type='ghost'
                        >Cancel</Button>
                    </div>
                    <div>
                        <Button onClick={onSend} type='default'>
                            Send
                        </Button>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default FeatureCard