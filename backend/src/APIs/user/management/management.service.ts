import userRepository from '../_shared/repo/user.repository'
import { EUserRoles } from '../../../constant/users'

export const getAllUsersService = async () => {
    return userRepository.getAllUsers()
}

export const updateUserRoleService = async (userId: string, role: EUserRoles) => {
    const updatedUser = await userRepository.updateUserRole(userId, role)
    return updatedUser
}