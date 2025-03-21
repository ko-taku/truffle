const SimpleContract = artifacts.require("SimpleContract");

contract("SimpleContract", (accounts) => {
    let simpleContract;
    const initialMessage = "Hello, Contract";

    before(async () => {
        // 배포된 컨트랙트 가져오기
        simpleContract = await SimpleContract.new(initialMessage);
    });

    it("✅ 초기 메시지를 올바르게 저장해야 한다.", async () => {
        const message = await simpleContract.message();
        assert.equal(message, initialMessage, "초기 메시지가 일치해야 합니다.");
    });

    it("✅ setMessage 함수로 메시지를 변경할 수 있어야 한다.", async () => {
        const newMessage = "Updated Message!";
        await simpleContract.setMessage(newMessage, { from: accounts[0] });

        const message = await simpleContract.message();
        assert.equal(message, newMessage, "변경된 메시지가 일치해야 합니다.");
    });

    it("✅ 다른 계정도 setMessage를 호출할 수 있어야 한다.", async () => {
        const anotherMessage = "Message from another account!";
        await simpleContract.setMessage(anotherMessage, { from: accounts[1] });

        const message = await simpleContract.message();
        assert.equal(message, anotherMessage, "다른 계정이 보낸 메시지가 일치해야 합니다.");
    });
});
