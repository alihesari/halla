import * as React from 'react';
import * as R from 'ramda';

import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { TextBox } from '../../components';


import './style.less';

export namespace EntityList {
  export interface Props {
		label: string;
		entities: any[];
		onItemClick: (id: any) => void;
	}
	export interface State {
  }
}

export class EntityList extends React.Component<EntityList.Props, EntityList.State> {

	state = {
		searchWord: ""
	};
	setSearch = ({target:{value}}) => {
		this.setState({searchWord: value})
	}

	render() {
		const { entities } = this.props;
		const filteredEntities = R.filter(R.propSatisfies(
			R.contains(this.state.searchWord),
			'title'
		), this.props.entities)
		return (
		<div style={{display: 'contents'}}>
				<div className="fixed">
					<TextBox
						className={"search-box"}
						onChange={this.setSearch}
						hintText={`Search ${this.props.label}`}
					/>
				</div>

				<div className="scrolled">
					<List>
						{R.map(({title, _id}) => {
							const itemClick = () => this.props.onItemClick(_id);

							return <ListItem
									onClick={itemClick}
									className="list-item"
									key={_id}
									primaryText={title}
									leftAvatar={<Avatar>{R.pipe(R.head, R.toUpper)(title)}</Avatar>}
								/>
						}
						)(filteredEntities.reverse())}
						
						{R.isEmpty(entities) && 
							<ListItem
							className="list-item"
							primaryText={"No channels found"}/>
						}
					</List>						
				</div>
				{this.props.children}
			<Divider />
		</div>
		);
	}
}