import { z } from "zod";
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";

export async function me(req, res) {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
    permissions: user.permissions,
  });
}

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(1, "Username is required").optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "user"]).default("user"),
  permissions: z.array(z.string()).optional(),
});

export async function createUser(req, res) {
  try {
    const parse = createUserSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parse.error.flatten().fieldErrors,
      });
    }

    const { name, email, password, role, username } = parse.data;

    // Check if user with email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate username from email if not provided
    const generatedUsername = username || email.split("@")[0];

    // Create user
    // Admins get null permissions (full access), regular users get specified permissions or empty array
    const userPermissions = role === "admin" ? null : (parse.data.permissions || []);

    const user = await User.create({
      name,
      email,
      username: generatedUsername,
      passwordHash,
      role: role || "user",
      permissions: userPermissions,
    });

    return res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Create user error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role: z.enum(["admin", "user"]).optional(),
  password: z.string().min(6).optional(),
  permissions: z.array(z.string()).optional(),
});

export async function updateUser(req, res) {
  try {
    const userId = Number(req.params.id);
    const parse = updateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parse.error.flatten().fieldErrors,
      });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updateData = { ...parse.data };

    // If email is being updated, check if it's already taken
    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await User.findOne({ where: { email: updateData.email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Hash password if provided
    if (updateData.password) {
      updateData.passwordHash = await bcrypt.hash(updateData.password, 10);
      delete updateData.password;
    }

    // Handle permissions: admins get null (full access), regular users get array
    if (updateData.permissions !== undefined) {
      if (updateData.role === "admin" || user.role === "admin") {
        updateData.permissions = null; // Admins always have full access
      }
    } else if (updateData.role === "admin") {
      updateData.permissions = null; // If changing to admin, set permissions to null
    }

    await user.update(updateData);
    
    // Reload user to get updated data
    await user.reload();

    return res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteUser(req, res) {
  try {
    const userId = Number(req.params.id);

    // Prevent deleting yourself
    if (req.user?.userId === userId) {
      return res.status(400).json({ message: "You cannot delete your own account" });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function listUsers(_req, res) {
  try {
    const users = await User.findAll({ order: [["id", "ASC"]] });
    return res.json(
      users.map((u) => ({
        id: u.id,
        username: u.username,
        email: u.email,
        name: u.name,
        role: u.role,
        permissions: u.permissions,
        createdAt: u.createdAt,
      }))
    );
  } catch (error) {
    console.error("List users error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
