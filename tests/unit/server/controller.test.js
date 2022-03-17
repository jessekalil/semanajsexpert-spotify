import { jest, test, describe, expect, beforeEach } from "@jest/globals"

import { Controller } from "../../../server/controller.js"
import { Service } from "../../../server/service.js"
import TestUtil from "../_util/testUtil"

describe("#Controller test service call", () => {
	beforeEach(() => {
		jest.restoreAllMocks()
		jest.clearAllMocks()
	})

	test("should call a service", async () => {
		const mockFilename = "index.html"
		const mockType = ".html"
		const mockStream = TestUtil.generateReadableStream()

		jest.spyOn(
			Service.prototype,
			Service.prototype.getFileStream.name
		).mockResolvedValue({ stream: mockStream, type: mockType })

		const controller = new Controller()
		const responseController = await controller.getFileStream(mockFilename)

		expect(Service.prototype.getFileStream).toHaveBeenCalled()
		expect(responseController.stream).toStrictEqual(mockStream)
		expect(responseController.type).toStrictEqual(mockType)
	})
})
