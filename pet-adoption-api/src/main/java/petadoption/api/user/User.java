package petadoption.api.user;

import jakarta.persistence.*;
import lombok.Data;
import petadoption.api.pet.Pet;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = User.TABLE_NAME)
public class User {
    public static final String TABLE_NAME = "USERS";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "USER_ID")
    Long id;

    @Column(name = "NAME")
    String name;

    @Column(name = "BIO")
    String bio;

    @Column(name = "EMAIL")
    String email;

    @Column(name = "PHONE")
    String phone;

    @Column(name = "LOCATION")
    String location;

    @Column(name = "IMG_URG")
    String imgUrl;

    @Column(name = "PASSWORD")
    String password;

    @Column(name = "USER_TYPE")
    String userType;

}
