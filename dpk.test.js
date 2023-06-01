const { deterministicPartitionKey, createHash } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when given a falsy value for the event", () => {
    const events = [null, undefined, false, 0, ""];
    events.forEach((event) => {
      const trivialKey = deterministicPartitionKey(event);
      expect(trivialKey).toBe("0");
    });
  });

  it("Returns a hash of the event when provided with an event that is not an object", () => {
    const events = ["test", [1, 2, 3], 48, true, new Set()];
    events.forEach((event) => {
      const partitionKey = deterministicPartitionKey(event);
      expect(partitionKey).toBe(createHash(JSON.stringify(event)));
    });
  });

  it("Returns a hash of the event when provided with an event object without a partitionKey prop", () => {
    const event = { test: "foo" };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(createHash(JSON.stringify(event)));
  });

  it("Returns a hash of the event when provided with an event object with a partitionKey prop that is false", () => {
    expect(
      deterministicPartitionKey({
        partitionKey: false,
      })
    ).toBe(createHash('{"partitionKey":false}'));
  });

  it("Returns the partitionKey value when an event with a partitionKey prop is provided and its value is a string", () => {
    const partitionKey = deterministicPartitionKey({ partitionKey: "foo" });
    expect(partitionKey).toBe("foo");
  });

  it("Returns the partitionKey value as a JSON string when an event with a partitionKey prop is provided and its value is not a string", () => {
    expect(
      deterministicPartitionKey({
        partitionKey: { foo: "bar" },
      })
    ).toBe('{"foo":"bar"}');

    expect(
      deterministicPartitionKey({
        partitionKey: ["foo", "bar"],
      })
    ).toBe('["foo","bar"]');

    expect(
      deterministicPartitionKey({
        partitionKey: true,
      })
    ).toBe("true");
  });

  it("Returns a hash of the partitionKey value when provided with a partitionKey string that is longer than MAX_PARTITION_KEY_LENGTH", () => {
    const longString = "a".repeat(257);
    const partitionKey = deterministicPartitionKey({
      partitionKey: longString,
    });
    expect(partitionKey).toBe(createHash(longString));
  });

  it("Returns a hash of the partitionKey strigified value when provided with a partitionKey string that is a large object", () => {
    const largeObject = {
      foo: "bar".repeat(100),
    };
    const partitionKey = deterministicPartitionKey({
      partitionKey: largeObject,
    });
    expect(partitionKey).toBe(createHash(JSON.stringify(largeObject)));
  });
});

describe("createHash", () => {
  it("returns a hash of the input", () => {
    const data = "test";
    const expectedHash =
      "9ece086e9bac491fac5c1d1046ca11d737b92a2b2ebd93f005d7b710110c0a678288166e7fbe796883a4f2e9b3ca9f484f521d0ce464345cc1aec96779149c14";
    const actualHash = createHash(data);
    expect(actualHash).toBe(expectedHash);
  });
});
