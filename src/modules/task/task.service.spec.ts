describe('Task Service', () => {
  let i = 0;
  beforeEach(() => {
    i = 1;
  });

  it('increment by 1', () => {
    i++;
    expect(i).toEqual(2);
  });
});
