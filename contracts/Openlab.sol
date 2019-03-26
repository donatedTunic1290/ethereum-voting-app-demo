pragma solidity >=0.4.21 <0.6.0;

contract Openlab {
	uint256 public totalClicks = 0;
	bytes32[] text;

	constructor() public {}

	function addClick() public {
		totalClicks = totalClicks + 1;
	}

	function removeClick() public {
		totalClicks = totalClicks - 1;
	}

	function addText(bytes32 _text) public{
		require(_text != 0);
		text.push(_text);
	}

	function getText() public view returns (bytes32[]) {
		return text;
	}

	function getClicks() public view returns (uint256) {
		return totalClicks;
	}
}